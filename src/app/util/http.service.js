"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var auth_guard_service_1 = require("../auth/auth.guard.service");
require("rxjs/Rx");
var HttpService = (function () {
    function HttpService(http, router, authGuard) {
        this.http = http;
        this.router = router;
        this.authGuard = authGuard;
        this.baseUrl = 'http://localhost:8080/trmsSOA';
    }
    HttpService.prototype.request = function (url, options) {
        return this.http.request(this.baseUrl + url, this.getRequestOptionArgs(options));
    };
    HttpService.prototype.get = function (url, options) {
        return this.http.get(this.baseUrl + url, this.getRequestOptionArgs(options));
    };
    HttpService.prototype.post = function (url, body, options) {
        return this.http.post(this.baseUrl + url, body, this.getRequestOptionArgs(options));
    };
    HttpService.prototype.postForFileUpload = function (url, body, options) {
        return this.http.post(this.baseUrl + url, body, this.getRequestOptionArgsForFileUpload(options));
    };
    HttpService.prototype.getForFileDownload = function (url, options) {
        return this.http.get(this.baseUrl + url, this.getRequestOptionArgsForFileDownload(options));
    };
    HttpService.prototype.put = function (url, body, options) {
        return this.http.put(this.baseUrl + url, body, this.getRequestOptionArgs(options));
    };
    HttpService.prototype.delete = function (url, options) {
        return this.http.delete(this.baseUrl + url, this.getRequestOptionArgs(options));
    };
    HttpService.prototype.getRequestOptionArgs = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        var token = JSON.parse(sessionStorage.getItem('token'));
        if (token && token.access_token) {
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Authorization', 'Bearer ' + token.access_token);
            return options;
        }
        var navigationExtras = {};
        this.router.navigate(['/login'], navigationExtras);
    };
    HttpService.prototype.getRequestOptionArgsForFileUpload = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        var token = JSON.parse(sessionStorage.getItem('token'));
        if (token && token.access_token) {
            options.headers.append('Authorization', 'Bearer ' + token.access_token);
            return options;
        }
        var navigationExtras = {};
        this.router.navigate(['/login'], navigationExtras);
    };
    HttpService.prototype.getRequestOptionArgsForFileDownload = function (options) {
        if (options == null) {
            options = new http_1.RequestOptions();
            options.responseType = http_1.ResponseContentType.ArrayBuffer;
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        var token = JSON.parse(sessionStorage.getItem('token'));
        if (token && token.access_token) {
            options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
            options.headers.append('Authorization', 'Bearer ' + token.access_token);
            return options;
        }
        var navigationExtras = {};
        this.router.navigate(['/login'], navigationExtras);
    };
    return HttpService;
}());
HttpService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, router_1.Router, auth_guard_service_1.AuthGuard])
], HttpService);
exports.HttpService = HttpService;
//# sourceMappingURL=http.service.js.map