var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { OidcSecurityCommon } from './oidc.security.common';
import { KJUR, KEYUTIL, hextob64u } from 'jsrsasign';
var OidcSecurityValidation = (function () {
    function OidcSecurityValidation(oidcSecurityCommon) {
        this.oidcSecurityCommon = oidcSecurityCommon;
    }
    OidcSecurityValidation.prototype.isTokenExpired = function (token, offsetSeconds) {
        var decoded;
        decoded = this.getPayloadFromToken(token, false);
        return !(this.validate_id_token_exp_not_expired(decoded, offsetSeconds));
    };
    OidcSecurityValidation.prototype.validate_id_token_exp_not_expired = function (decoded_id_token, offsetSeconds) {
        var tokenExpirationDate = this.getTokenExpirationDate(decoded_id_token);
        offsetSeconds = offsetSeconds || 0;
        if (tokenExpirationDate == null) {
            return false;
        }
        return (tokenExpirationDate.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    };
    OidcSecurityValidation.prototype.validate_required_id_token = function (dataIdToken) {
        var validated = true;
        if (!dataIdToken.hasOwnProperty('iss')) {
            validated = false;
            this.oidcSecurityCommon.logWarning('iss is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('sub')) {
            validated = false;
            this.oidcSecurityCommon.logWarning('sub is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('aud')) {
            validated = false;
            this.oidcSecurityCommon.logWarning('aud is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('exp')) {
            validated = false;
            this.oidcSecurityCommon.logWarning('exp is missing, this is required in the id_token');
        }
        if (!dataIdToken.hasOwnProperty('iat')) {
            validated = false;
            this.oidcSecurityCommon.logWarning('iat is missing, this is required in the id_token');
        }
        return validated;
    };
    OidcSecurityValidation.prototype.validate_id_token_iat_max_offset = function (dataIdToken, max_offset_allowed_in_seconds) {
        if (!dataIdToken.hasOwnProperty('iat')) {
            return false;
        }
        var dateTime_iat_id_token = new Date(0);
        dateTime_iat_id_token.setUTCSeconds(dataIdToken.iat);
        max_offset_allowed_in_seconds = max_offset_allowed_in_seconds || 0;
        if (dateTime_iat_id_token == null) {
            return false;
        }
        this.oidcSecurityCommon.logDebug('validate_id_token_iat_max_offset: ' + (new Date().valueOf() - dateTime_iat_id_token.valueOf()) + ' < ' + (max_offset_allowed_in_seconds * 1000));
        return ((new Date().valueOf() - dateTime_iat_id_token.valueOf()) < (max_offset_allowed_in_seconds * 1000));
    };
    OidcSecurityValidation.prototype.validate_id_token_nonce = function (dataIdToken, local_nonce) {
        if (dataIdToken.nonce !== local_nonce) {
            this.oidcSecurityCommon.logDebug('Validate_id_token_nonce failed, dataIdToken.nonce: ' + dataIdToken.nonce + ' local_nonce:' + local_nonce);
            return false;
        }
        return true;
    };
    OidcSecurityValidation.prototype.validate_id_token_iss = function (dataIdToken, authWellKnownEndpoints_issuer) {
        if (dataIdToken.iss != authWellKnownEndpoints_issuer) {
            this.oidcSecurityCommon.logDebug('Validate_id_token_iss failed, dataIdToken.iss: ' + dataIdToken.iss + ' authWellKnownEndpoints issuer:' + authWellKnownEndpoints_issuer);
            return false;
        }
        return true;
    };
    OidcSecurityValidation.prototype.validate_id_token_aud = function (dataIdToken, aud) {
        if (dataIdToken.aud != aud) {
            this.oidcSecurityCommon.logDebug('Validate_id_token_aud failed, dataIdToken.aud: ' + dataIdToken.aud + ' client_id:' + aud);
            return false;
        }
        return true;
    };
    OidcSecurityValidation.prototype.validateStateFromHashCallback = function (state, local_state) {
        if (state != local_state) {
            this.oidcSecurityCommon.logDebug('ValidateStateFromHashCallback failed, state: ' + state + ' local_state:' + local_state);
            return false;
        }
        return true;
    };
    OidcSecurityValidation.prototype.validate_userdata_sub_id_token = function (id_token_sub, userdata_sub) {
        if (id_token_sub != userdata_sub) {
            this.oidcSecurityCommon.logDebug('validate_userdata_sub_id_token failed, id_token_sub: ' + id_token_sub + ' userdata_sub:' + userdata_sub);
            return false;
        }
        return true;
    };
    OidcSecurityValidation.prototype.getPayloadFromToken = function (token, encode) {
        var data = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            if (encode) {
                return encoded;
            }
            data = JSON.parse(this.urlBase64Decode(encoded));
        }
        return data;
    };
    OidcSecurityValidation.prototype.getHeaderFromToken = function (token, encode) {
        var data = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[0];
            if (encode) {
                return encoded;
            }
            data = JSON.parse(this.urlBase64Decode(encoded));
        }
        return data;
    };
    OidcSecurityValidation.prototype.getSignatureFromToken = function (token, encode) {
        var data = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[2];
            if (encode) {
                return encoded;
            }
            data = JSON.parse(this.urlBase64Decode(encoded));
        }
        return data;
    };
    OidcSecurityValidation.prototype.validate_signature_id_token = function (id_token, jwtkeys) {
        if (!jwtkeys || !jwtkeys.keys) {
            return false;
        }
        var header_data = this.getHeaderFromToken(id_token, false);
        var kid = header_data.kid;
        var alg = header_data.alg;
        if ('RS256' != alg) {
            this.oidcSecurityCommon.logWarning('Only RS256 supported');
            return false;
        }
        var isValid = false;
        if (!header_data.hasOwnProperty('kid')) {
            var amountOfMatchingKeys = 0;
            for (var _i = 0, _a = jwtkeys.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                if (key.kty == 'RSA' && key.use == 'sig') {
                    amountOfMatchingKeys = amountOfMatchingKeys + 1;
                }
            }
            if (amountOfMatchingKeys == 0) {
                this.oidcSecurityCommon.logWarning('no keys found, incorrect Signature, validation failed for id_token');
                return false;
            }
            else if (amountOfMatchingKeys > 1) {
                this.oidcSecurityCommon.logWarning('no ID Token kid claim in JOSE header and multiple supplied in jwks_uri');
                return false;
            }
            else {
                for (var _b = 0, _c = jwtkeys.keys; _b < _c.length; _b++) {
                    var key = _c[_b];
                    if (key.kty == 'RSA' && key.use == 'sig') {
                        var publickey = KEYUTIL.getKey(key);
                        isValid = KJUR.jws.JWS.verify(id_token, publickey, ['RS256']);
                        if (!isValid) {
                            this.oidcSecurityCommon.logWarning('incorrect Signature, validation failed for id_token');
                        }
                        return isValid;
                    }
                }
            }
        }
        else {
            for (var _d = 0, _e = jwtkeys.keys; _d < _e.length; _d++) {
                var key = _e[_d];
                if (key.kid == kid) {
                    var publickey = KEYUTIL.getKey(key);
                    isValid = KJUR.jws.JWS.verify(id_token, publickey, ['RS256']);
                    if (!isValid) {
                        this.oidcSecurityCommon.logWarning('incorrect Signature, validation failed for id_token');
                    }
                    return isValid;
                }
            }
        }
        return isValid;
    };
    OidcSecurityValidation.prototype.config_validate_response_type = function (response_type) {
        if (response_type === 'id_token token' || response_type === 'id_token') {
            return true;
        }
        this.oidcSecurityCommon.logWarning('module configure incorrect, invalid response_type:' + response_type);
        return false;
    };
    OidcSecurityValidation.prototype.validate_id_token_at_hash = function (access_token, at_hash) {
        this.oidcSecurityCommon.logDebug('From the server:' + at_hash);
        var testdata = this.generate_at_hash('' + access_token);
        this.oidcSecurityCommon.logDebug('client validation not decoded:' + testdata);
        if (testdata == at_hash) {
            return true;
        }
        else {
            var testValue = this.generate_at_hash('' + decodeURIComponent(access_token));
            this.oidcSecurityCommon.logDebug('-gen access--' + testValue);
            if (testValue == at_hash) {
                return true;
            }
        }
        return false;
    };
    OidcSecurityValidation.prototype.generate_at_hash = function (access_token) {
        var hash = KJUR.crypto.Util.hashString(access_token, 'sha256');
        var first128bits = hash.substr(0, hash.length / 2);
        var testdata = hextob64u(first128bits);
        return testdata;
    };
    OidcSecurityValidation.prototype.getTokenExpirationDate = function (dataIdToken) {
        if (!dataIdToken.hasOwnProperty('exp')) {
            return new Date();
        }
        var date = new Date(0);
        date.setUTCSeconds(dataIdToken.exp);
        return date;
    };
    OidcSecurityValidation.prototype.urlBase64Decode = function (str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    };
    return OidcSecurityValidation;
}());
OidcSecurityValidation = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [OidcSecurityCommon])
], OidcSecurityValidation);
export { OidcSecurityValidation };
//# sourceMappingURL=oidc.security.validation.js.map