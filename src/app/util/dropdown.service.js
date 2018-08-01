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
require("rxjs/add/operator/map");
var http_service_1 = require("../util/http.service");
var http_1 = require("@angular/http");
var DropdownService = (function () {
    function DropdownService(http, _http) {
        var _this = this;
        this.http = http;
        this._http = _http;
        this.baseUrl = 'http://localhost:8080/trmsSOA';
        this.skills = [];
        this.skills.push({ label: 'Select Skill', value: "" });
        this.getCandidateSkill().subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var e = data_1[_i];
                _this.skills.push({ label: e.course, value: e.course });
            }
        });
        this.recruitmentStatus = [];
        this.recruitmentStatus.push({ label: 'Select Recruitment Status', value: "" });
        this.getRecruitmentStatus().subscribe(function (data) {
            for (var _i = 0, data_2 = data; _i < data_2.length; _i++) {
                var e = data_2[_i];
                _this.recruitmentStatus.push({ label: e.statusType, value: e.statusType });
            }
        });
        this.candidateVisa = [];
        this.candidateVisa.push({ label: 'Select Visa', value: "" });
        this.getCandidateVisa().subscribe(function (data) {
            for (var _i = 0, data_3 = data; _i < data_3.length; _i++) {
                var e = data_3[_i];
                _this.candidateVisa.push({ label: e.name, value: e.name });
            }
        });
        this.candidatePayType = [];
        this.candidatePayType.push({ label: 'Select Pay Type', value: "" });
        this.getPayType().subscribe(function (data) {
            for (var _i = 0, data_4 = data; _i < data_4.length; _i++) {
                var e = data_4[_i];
                _this.candidatePayType.push({ label: e.type, value: e.type });
            }
        });
        this.gradingSystem = [];
        this.gradingSystem.push({ label: 'Select Grading System', value: "" });
        this.getGradingSystemService().subscribe(function (data) {
            for (var _i = 0, data_5 = data; _i < data_5.length; _i++) {
                var e = data_5[_i];
                _this.gradingSystem.push({ label: e.name, value: e.name });
            }
        });
        this.specialization = [];
        this.specialization.push({ label: 'Select Specilazation', value: "" });
        this.getSpecilizationList().subscribe(function (data) {
            for (var _i = 0, data_6 = data; _i < data_6.length; _i++) {
                var e = data_6[_i];
                _this.specialization.push({ label: e.name, value: e.name });
            }
        });
        this.workAuthorization = [];
        this.workAuthorization.push({ label: 'Select Work Authorization', value: "" });
        this.getWorkAuthorizationList().subscribe(function (data) {
            for (var _i = 0, data_7 = data; _i < data_7.length; _i++) {
                var e = data_7[_i];
                _this.workAuthorization.push({ label: e.name, value: e.name });
            }
        });
        this.employmentTypes = [];
        this.employmentTypes.push({ label: 'Select EmploymentTypes', value: "" });
        this.getEmploymentTypesList().subscribe(function (data) {
            for (var _i = 0, data_8 = data; _i < data_8.length; _i++) {
                var e = data_8[_i];
                _this.employmentTypes.push({ label: e.name, value: e.name });
            }
        });
    }
    DropdownService.prototype.ngOnInit = function () {
    };
    DropdownService.prototype.getCandidateSkill = function () {
        return this.http.get('/courses').map(function (response) { return response.json(); });
    };
    DropdownService.prototype.getRecruitmentStatus = function () {
        return this.http.get('/remarks').map(function (response) { return response.json(); });
    };
    DropdownService.prototype.getCandidateVisa = function () {
        return this.http.get('/visas').map(function (response) { return response.json(); });
    };
    DropdownService.prototype.getPayType = function () {
        return this.http.get('/paytypes').map(function (response) { return response.json(); });
    };
    DropdownService.prototype.getGradingSystemService = function () {
        return this.http.get('/gradingsystems').map(function (response) { return response.json(); });
    };
    DropdownService.prototype.getSpecilizationList = function () {
        return this.http.get('/specializations').map(function (response) { return response.json(); });
    };
    DropdownService.prototype.getWorkAuthorizationList = function () {
        return this.http.get('/workAuthorizations').map(function (response) { return response.json(); });
    };
    DropdownService.prototype.getEmploymentTypesList = function () {
        return this.http.get('/employmentTypes').map(function (response) { return response.json(); });
    };
    return DropdownService;
}());
DropdownService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService, http_1.Http])
], DropdownService);
exports.DropdownService = DropdownService;
//# sourceMappingURL=dropdown.service.js.map