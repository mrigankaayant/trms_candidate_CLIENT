"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_service_1 = require("./auth.guard.service");
var auth_service_1 = require("./auth.service");
var auth_component_1 = require("./auth.component");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/http");
var primeng_1 = require("primeng/primeng");
var loginRoutes = [
    { path: 'login', component: auth_component_1.AuthComponent }
];
var AuthRoutingModule = (function () {
    function AuthRoutingModule() {
    }
    return AuthRoutingModule;
}());
AuthRoutingModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, platform_browser_1.BrowserModule, forms_1.FormsModule, primeng_1.InputTextModule, primeng_1.ButtonModule, primeng_1.PanelModule,
            primeng_1.InputMaskModule, primeng_1.RadioButtonModule, primeng_1.CalendarModule,
            primeng_1.PanelModule, primeng_1.FieldsetModule, primeng_1.DropdownModule, primeng_1.CheckboxModule, primeng_1.InputTextareaModule,
            primeng_1.FileUploadModule, primeng_1.MenubarModule, primeng_1.TabMenuModule,
            primeng_1.DataTableModule, primeng_1.SharedModule, http_1.HttpModule, forms_1.ReactiveFormsModule, primeng_1.AutoCompleteModule, primeng_1.TabViewModule,
            primeng_1.SplitButtonModule, animations_1.BrowserAnimationsModule,
            router_1.RouterModule.forChild(loginRoutes)
        ],
        exports: [
            router_1.RouterModule
        ],
        declarations: [auth_component_1.AuthComponent],
        providers: [
            auth_guard_service_1.AuthGuard,
            auth_service_1.AuthService
        ]
    })
], AuthRoutingModule);
exports.AuthRoutingModule = AuthRoutingModule;
//# sourceMappingURL=auth.router.js.map