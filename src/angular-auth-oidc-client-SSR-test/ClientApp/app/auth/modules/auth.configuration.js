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
var DefaultConfiguration = (function () {
    function DefaultConfiguration() {
        this.stsServer = 'https://localhost:44318';
        this.redirect_url = 'https://localhost:44311';
        this.client_id = 'angularclient';
        this.response_type = 'id_token token';
        this.resource = '';
        this.scope = 'openid email profile';
        this.post_logout_redirect_uri = 'https://localhost:44311/unauthorized';
        this.start_checksession = false;
        this.silent_renew = true;
        this.startup_route = '/dataeventrecords';
        this.forbidden_route = '/forbidden';
        this.unauthorized_route = '/unauthorized';
        this.log_console_warning_active = true;
        this.log_console_debug_active = false;
        this.max_id_token_iat_offset_allowed_in_seconds = 3;
        this.override_well_known_configuration = false;
        this.override_well_known_configuration_url = 'https://localhost:44386/wellknownconfiguration.json';
    }
    return DefaultConfiguration;
}());
export { DefaultConfiguration };
var OpenIDImplicitFlowConfiguration = (function () {
    function OpenIDImplicitFlowConfiguration() {
    }
    return OpenIDImplicitFlowConfiguration;
}());
export { OpenIDImplicitFlowConfiguration };
var AuthConfiguration = (function () {
    function AuthConfiguration(defaultConfig) {
        this.defaultConfig = defaultConfig;
    }
    Object.defineProperty(AuthConfiguration.prototype, "stsServer", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.stsServer || this.defaultConfig.stsServer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "redirect_url", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.redirect_url || this.defaultConfig.redirect_url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "client_id", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.client_id || this.defaultConfig.client_id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "response_type", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.response_type || this.defaultConfig.response_type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "resource", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.resource || this.defaultConfig.resource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "scope", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.scope || this.defaultConfig.scope;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "post_logout_redirect_uri", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.post_logout_redirect_uri || this.defaultConfig.post_logout_redirect_uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "start_checksession", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.start_checksession || this.defaultConfig.start_checksession;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "silent_renew", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.silent_renew || this.defaultConfig.silent_renew;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "startup_route", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.startup_route || this.defaultConfig.startup_route;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "forbidden_route", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.forbidden_route || this.defaultConfig.forbidden_route;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "unauthorized_route", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.unauthorized_route || this.defaultConfig.unauthorized_route;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "log_console_warning_active", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.log_console_warning_active || this.defaultConfig.log_console_warning_active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "log_console_debug_active", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.log_console_debug_active || this.defaultConfig.log_console_debug_active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "max_id_token_iat_offset_allowed_in_seconds", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds || this.defaultConfig.max_id_token_iat_offset_allowed_in_seconds;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "override_well_known_configuration", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.override_well_known_configuration || this.defaultConfig.override_well_known_configuration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AuthConfiguration.prototype, "override_well_known_configuration_url", {
        get: function () {
            return this.openIDImplicitFlowConfiguration.override_well_known_configuration_url || this.defaultConfig.override_well_known_configuration_url;
        },
        enumerable: true,
        configurable: true
    });
    AuthConfiguration.prototype.init = function (openIDImplicitFlowConfiguration) {
        this.openIDImplicitFlowConfiguration = openIDImplicitFlowConfiguration;
    };
    return AuthConfiguration;
}());
AuthConfiguration = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [DefaultConfiguration])
], AuthConfiguration);
export { AuthConfiguration };
//# sourceMappingURL=auth.configuration.js.map