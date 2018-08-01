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
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_service_1 = require("./auth.service");
var forms_1 = require("@angular/forms");
var AuthComponent = (function () {
    function AuthComponent(authService, router, formBuilder) {
        this.authService = authService;
        this.router = router;
        this.formBuilder = formBuilder;
        this.msgs = [];
        this.setMessage();
    }
    AuthComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            'username': new forms_1.FormControl('', forms_1.Validators.required),
            'password': new forms_1.FormControl('', forms_1.Validators.required),
        });
    };
    AuthComponent.prototype.setMessage = function () {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    };
    AuthComponent.prototype.login = function (credential) {
        var _this = this;
        this.authService.login(credential.username, credential.password)
            .subscribe(function (data) {
            sessionStorage.setItem('token', JSON.stringify(data));
            //sessionStorage.setItem('AccessToken', JSON.stringify(data.access_token));
            var redirect = _this.authService.redirectUrl ? _this.authService.redirectUrl : '';
            if (redirect == 'login') {
                redirect = "";
            }
            var navigationExtras = {
                preserveQueryParams: true,
                preserveFragment: true
            };
            _this.router.navigate([redirect], navigationExtras);
        }, function (error) {
            _this.loginForm.reset();
            _this.msgs = [];
            _this.msgs.push({ severity: 'error', summary: 'Error ', detail: 'Please Enter Correct Username or Password ' });
        });
    };
    AuthComponent.prototype.logout = function () {
        this.authService.logout();
        this.setMessage();
    };
    return AuthComponent;
}());
AuthComponent = __decorate([
    core_1.Component({
        templateUrl: '/app/auth/login.html',
        styleUrls: ['./app/auth/login.css']
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        router_1.Router, forms_1.FormBuilder])
], AuthComponent);
exports.AuthComponent = AuthComponent;
//# sourceMappingURL=auth.component.js.map