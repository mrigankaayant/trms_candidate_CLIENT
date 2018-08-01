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
var candidate_service_1 = require("./candidate.service");
var MenuComponent = (function () {
    function MenuComponent(candidateService) {
        this.candidateService = candidateService;
    }
    MenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        //let id = this.route.snapshot.params["id"];
        this.candidateService.getUserType().subscribe(function (data) {
            _this.userMst = data;
        }, function (err) {
            console.log(err);
        }, function () {
            _this.candidateService.getCandidateDetailsByUserId(_this.userMst.userId).subscribe(function (data) {
                _this.candidateId = data.candidateId;
            }, function (err) {
                console.log(err);
            }, function () {
                _this.items = [
                    { label: 'Registration', icon: 'fa fa-plus', routerLink: ['/candidate/registration'] },
                    { label: 'Enrollment Form', icon: 'fa-list', routerLink: ['/candidate/enrollment/' + _this.candidateId] },
                    { label: 'Payment', icon: 'fa-list', routerLink: ['/candidate/viewpaymentdetails/'] },
                    { label: 'Traning', icon: 'fa-users', routerLink: ['/yyy'] },
                    { label: 'Resume', icon: 'fa-history', routerLink: ['/xx'] },
                    { label: 'Documents', icon: 'fa-search', routerLink: ['/xx'] },
                    { label: 'Videos', icon: 'fa-inr', routerLink: ['/xx'] },
                    { label: 'Log Out', icon: 'fa-sign-out', routerLink: ['/candidate/logout'] }
                ];
            });
        });
    };
    return MenuComponent;
}());
MenuComponent = __decorate([
    core_1.Component({
        selector: 'menu',
        templateUrl: 'app/candidate/menu.html'
    }),
    __metadata("design:paramtypes", [candidate_service_1.CandidateService])
], MenuComponent);
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map