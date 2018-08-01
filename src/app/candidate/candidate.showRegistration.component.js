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
var dropdown_service_1 = require("../util/dropdown.service");
var candidate_service_1 = require("./candidate.service");
var social_media_model_1 = require("../model/social.media.model");
var candidate_model_1 = require("../model/candidate.model");
var RegistrationDetails = (function () {
    function RegistrationDetails(formBuilder, route, dropdownService, router, candidateService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.dropdownService = dropdownService;
        this.router = router;
        this.candidateService = candidateService;
    }
    RegistrationDetails.prototype.ngOnInit = function () {
        var _this = this;
        this.showloader = true;
        this.candidate = new candidate_model_1.Candidate();
        this.candidate.preferredLocations = new Array();
        this.candidate.visas = new Array();
        this.candidate.socialMedia = new social_media_model_1.SocialMedia();
        this.candidate.phones = new Array();
        var id = this.route.snapshot.params["id"];
        this.candidateService.getRegistrationDetails(id).subscribe(function (data) {
            console.log(data);
            _this.candidate = data;
            _this.id = _this.candidate.candidateId;
        }, function (err) {
            console.log(err);
        }, function () {
            _this.showloader = false;
        });
    };
    RegistrationDetails.prototype.goToEnrollment = function () {
        this.router.navigate(['candidate/enrollment', this.id]);
    };
    return RegistrationDetails;
}());
RegistrationDetails = __decorate([
    core_1.Component({
        selector: 'registrationDetails',
        templateUrl: 'app/candidate/showRegistrationDetails.html',
        styleUrls: ['./app/candidate/candidate.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute,
        dropdown_service_1.DropdownService, router_1.Router, candidate_service_1.CandidateService])
], RegistrationDetails);
exports.RegistrationDetails = RegistrationDetails;
//# sourceMappingURL=candidate.showRegistration.component.js.map