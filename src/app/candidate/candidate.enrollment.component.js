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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var candidate_service_1 = require("./candidate.service");
var EnrollmentComponent = (function () {
    //pdfSrc: any;
    function EnrollmentComponent(formBuilder, route, router, candidateService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.candidateService = candidateService;
        //console.log(sessionStorage.getItem("AccessToken"));
    }
    EnrollmentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showloader = true;
        this.candidateId = this.route.snapshot.params["id"];
        this.candidateService.getEnrollmentForm(this.candidateId).subscribe(function (data) {
            _this.path = data.generatedEnrollmentForm;
            _this.candidateName = data.candidateName;
            _this.fileName = data.uploadEnrollmentFormName;
            _this.checkForEnrollment = data.gender;
        }, function (err) {
            //console.log(err);
        }, function () {
            //console.log(this.id);
            _this.showloader = false;
        });
    };
    EnrollmentComponent.prototype.fileChange = function (event) {
        var _this = this;
        var fileList = event.target.files;
        var file = fileList[0];
        var formData = new FormData();
        formData.append('file', file, file.name);
        this.candidateService.uploadFile(formData, this.candidateId, this.candidateName).subscribe(function (data) {
            console.log(data);
            _this.fileName = data.uploadEnrollmentFormName;
        }, function (err) {
            console.log(err);
        }, function () {
            //console.log(this.id);
        });
    };
    EnrollmentComponent.prototype.viewEnrollmentForm = function () {
        var _this = this;
        //this.fileName = this.candidateName+"_"+this.candidateId;
        console.log(this.fileName);
        console.log("hit");
        this.candidateService.downloadEnrollmentForm(this.fileName).subscribe(function (response) {
            var blob = new Blob([response], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
        }, function (err) {
            //console.log(err);
        }, function () {
            //console.log(this.id);
            _this.showloader = false;
        });
        ;
    };
    return EnrollmentComponent;
}());
EnrollmentComponent = __decorate([
    core_1.Component({
        selector: 'enrollment',
        templateUrl: 'app/candidate/candidateEnrollment.html',
        styleUrls: ['./app/candidate/candidate.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, candidate_service_1.CandidateService])
], EnrollmentComponent);
exports.EnrollmentComponent = EnrollmentComponent;
//# sourceMappingURL=candidate.enrollment.component.js.map