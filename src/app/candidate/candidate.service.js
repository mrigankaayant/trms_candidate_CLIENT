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
var http_1 = require("@angular/http");
var http_service_1 = require("../util/http.service");
var CandidateService = (function () {
    function CandidateService(http, nativeHttp) {
        this.http = http;
        this.nativeHttp = nativeHttp;
    }
    CandidateService.prototype.getUserType = function () {
        return this.http.get('/findUserType').map(function (response) { return response.json(); });
    };
    CandidateService.prototype.getCandidateDetailsByUserId = function (userId) {
        return this.http.get('/candidate/' + userId).map(function (response) { return response.json(); });
    };
    CandidateService.prototype.saveRegistration = function (registartionModel) {
        console.log("Enter Service");
        return this.http.post('/saveRegistration', registartionModel, this.options).map(function (response) { return response.json(); });
    };
    CandidateService.prototype.getRegistrationDetails = function (candidateId) {
        return this.http.get('/recruiting/view/candidate/' + candidateId).map(function (response) { return response.json(); });
    };
    CandidateService.prototype.getPaymentDetails = function (candidateId) {
        return this.http.get('/paymentDetails/' + candidateId).map(function (response) { return response.json(); });
    };
    CandidateService.prototype.makePayment = function (paymentModel) {
        return this.http.post('/make/payment', paymentModel, this.options).map(function (response) { return response.json(); });
    };
    CandidateService.prototype.goToSuccess = function (paymentId, payerId) {
        return this.http.post('/complete/payment/' + paymentId + '/' + payerId, this.options).map(function (response) { return response.json(); });
    };
    CandidateService.prototype.getPaypalPaymentDetails = function () {
        return this.http.get('/paymentList').map(function (response) { return response.json(); });
    };
    CandidateService.prototype.updateCourse = function (candidateSelectedCourse) {
        console.log(candidateSelectedCourse.candidateFinalCourses);
        return this.http.post('/update/candidatecourse', candidateSelectedCourse, this.options).map(function (response) { return response.json(); });
    };
    CandidateService.prototype.getEnrollmentForm = function (candidateId) {
        return this.http.get('/candidate/generateEnrollment/' + candidateId).map(function (response) { return response.json(); });
    };
    CandidateService.prototype.uploadFile = function (fromData, candidateId, candidateName) {
        return this.http.postForFileUpload('/upload/enrollmentForm/' + candidateId + '/' + candidateName, fromData, this.options).map(function (response) { return response.json(); });
    };
    CandidateService.prototype.downloadEnrollmentForm = function (fileName) {
        return this.http.getForFileDownload('/download/file/' + fileName).map(function (response) { return response.arrayBuffer(); });
    };
    return CandidateService;
}());
CandidateService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_service_1.HttpService, http_1.Http])
], CandidateService);
exports.CandidateService = CandidateService;
//# sourceMappingURL=candidate.service.js.map