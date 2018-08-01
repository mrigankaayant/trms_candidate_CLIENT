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
var registration_candidate_model_1 = require("../model/registration.candidate.model");
var RegistrationComponent = (function () {
    function RegistrationComponent(formBuilder, route, dropdownService, router, candidateService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.dropdownService = dropdownService;
        this.router = router;
        this.candidateService = candidateService;
        this.registartionModel = new registration_candidate_model_1.RegistartionModel();
        this.registrationMsg = [];
    }
    RegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showloader = true;
        this.gradingSystemList = [];
        this.specializationList = [];
        this.registrationMsg = [];
        this.showMenu = false;
        this.candidateService.getUserType().subscribe(function (data) {
            _this.userMst = data;
        }, function (err) {
            console.log(err);
        }, function () {
            _this.id = _this.userMst.userId;
            _this.candidateService.getCandidateDetailsByUserId(_this.id).subscribe(function (data) {
                _this.registartionModel = data;
                console.log(data);
                if (_this.registartionModel.registrationDate != null) {
                    console.log("Enter IF Block");
                    _this.showMenu = true;
                    _this.router.navigate(['candidate/showRegistrationDetails', _this.registartionModel.candidateId]);
                }
            }, function (err) {
                console.log(err);
            }, function () {
                if (_this.registartionModel.dateOfBirth != null) {
                    _this.registartionModel.dateOfBirth = new Date(_this.registartionModel.dateOfBirth);
                }
                if (_this.registartionModel.visas != null) {
                    for (var i = 0; i < _this.registartionModel.visas.length; i++) {
                        _this.registartionModel.visas[i].startDate = new Date(_this.registartionModel.visas[i].startDate);
                        _this.registartionModel.visas[i].endDate = new Date(_this.registartionModel.visas[i].endDate);
                    }
                }
                //this.addCandidateForm.controls['id'].setValue();
                console.log(_this.registartionModel.candidateId);
                _this.addCandidateForm.patchValue(_this.registartionModel);
                _this.showloader = false;
            });
        });
        this.gender = [
            { label: 'Select Gender', value: '' },
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' }
        ];
        this.visaList = this.dropdownService.candidateVisa;
        this.gradingSystemList = this.dropdownService.gradingSystem;
        this.specializationList = this.dropdownService.specialization;
        this.employmentTypes = this.dropdownService.employmentTypes;
        this.workAuthorizations = this.dropdownService.workAuthorization;
        this.visaStatus = [
            { label: 'Select Status', value: '' },
            { label: 'Active', value: 'Active' },
            { label: 'Inactive', value: 'Inactive' }
        ];
        this.educationType = [
            { label: 'Select Education Type', value: '' },
            { label: 'Part Time', value: 'Part Time' },
            { label: 'Full Time', value: 'Full Time' }
        ];
        this.addCandidateForm = this.formBuilder.group({
            'id': '',
            'candidateId': '',
            'candidateName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'dateOfBirth': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'gender': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'email': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"))])),
            'alternateEmail': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")])),
            'workMobile': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("^[0-9]{10}$")])),
            'homeMobile': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.pattern("^[0-9]{10}$")])),
            'country': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'state': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'city': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'zip': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'street': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'currentLocation': '',
            'employmentTypes': '',
            'workAuthorization': '',
            'preferredLocations': this.formBuilder.array([
                this.initPreferredLocations()
            ]),
            'visas': this.formBuilder.array([
                this.initVisa()
            ]),
            'workExperiences': this.formBuilder.array([
                this.initWorkExprience()
            ]),
            'skills': this.formBuilder.array([
                this.initSkill()
            ]),
            'educations': this.formBuilder.array([
                this.initEducation()
            ]),
            'linkedinUrl': '',
            'twitterUrl': '',
            'facebookUrl': '',
            'personalWebsite': ''
        });
    };
    RegistrationComponent.prototype.initPreferredLocations = function () {
        return this.formBuilder.group({
            'location': ''
        });
    };
    RegistrationComponent.prototype.addPreferredLocations = function () {
        var control = this.addCandidateForm.controls['preferredLocations'];
        control.push(this.initPreferredLocations());
    };
    RegistrationComponent.prototype.removePreferredLocations = function (i) {
        var control = this.addCandidateForm.controls['preferredLocations'];
        control.removeAt(i);
    };
    RegistrationComponent.prototype.initVisa = function () {
        return this.formBuilder.group({
            'immigrationType': '',
            'startDate': '',
            'endDate': '',
            'status': ''
        });
    };
    RegistrationComponent.prototype.initWorkExprience = function () {
        return this.formBuilder.group({
            'jobTitle': '',
            'companyName': '',
            'startDate': '',
            'endDate': ''
        });
    };
    RegistrationComponent.prototype.initSkill = function () {
        return this.formBuilder.group({
            'skillName': '',
            'yearsExp': '',
            'lastUsed': ''
        });
    };
    RegistrationComponent.prototype.initEducation = function () {
        return this.formBuilder.group({
            'highestDegree': '',
            'institution': '',
            'cityOrState': '',
            'country': ''
        });
    };
    RegistrationComponent.prototype.addVisa = function () {
        var control = this.addCandidateForm.controls['visas'];
        control.push(this.initVisa());
    };
    RegistrationComponent.prototype.addWorkExprience = function () {
        var control = this.addCandidateForm.controls['workExperiences'];
        control.push(this.initWorkExprience());
    };
    RegistrationComponent.prototype.addSkill = function () {
        var control = this.addCandidateForm.controls['skills'];
        control.push(this.initSkill());
    };
    RegistrationComponent.prototype.addEducation = function () {
        var control = this.addCandidateForm.controls['educations'];
        control.push(this.initEducation());
    };
    RegistrationComponent.prototype.removeVisa = function (i) {
        var control = this.addCandidateForm.controls['visas'];
        control.removeAt(i);
    };
    RegistrationComponent.prototype.removeWorkExprience = function (i) {
        var control = this.addCandidateForm.controls['workExperiences'];
        control.removeAt(i);
    };
    RegistrationComponent.prototype.removeSkill = function (i) {
        var control = this.addCandidateForm.controls['skills'];
        control.removeAt(i);
    };
    RegistrationComponent.prototype.removeEducation = function (i) {
        var control = this.addCandidateForm.controls['educations'];
        control.removeAt(i);
    };
    RegistrationComponent.prototype.setVisa = function (i) {
        return this.formBuilder.group({
            immigrationType: new forms_1.FormControl(i.immigrationType),
            startDate: new forms_1.FormControl(i.startDate),
            endDate: new forms_1.FormControl(i.endDate),
            status: new forms_1.FormControl(i.status)
        });
    };
    RegistrationComponent.prototype.setWorkExprience = function (w) {
        return this.formBuilder.group({
            jobTitle: new forms_1.FormControl(w.jobTitle),
            companyName: new forms_1.FormControl(w.companyName),
            startDate: new forms_1.FormControl(w.startDate),
            endDate: new forms_1.FormControl(w.endDate)
        });
    };
    RegistrationComponent.prototype.setSkill = function (s) {
        return this.formBuilder.group({
            skillName: new forms_1.FormControl(s.skillName),
            yearsExp: new forms_1.FormControl(s.yearsExp),
            lastUsed: new forms_1.FormControl(s.lastUsed)
        });
    };
    RegistrationComponent.prototype.setEducation = function (e) {
        return this.formBuilder.group({
            highestDegree: new forms_1.FormControl(e.highestDegree),
            institution: new forms_1.FormControl(e.institution),
            cityOrState: new forms_1.FormControl(e.cityOrState),
            country: new forms_1.FormControl(e.country)
        });
    };
    RegistrationComponent.prototype.saveRegistration = function () {
        var _this = this;
        this.registrationMsg = [];
        var id;
        this.showloader = true;
        this.candidateService.saveRegistration(this.addCandidateForm.value).subscribe(function (data) {
            id = data.candidateId;
            _this.registrationMsg.push({ severity: 'success', summary: 'Success', detail: 'Registerd Successfully' });
        }, function (err) {
            console.log(err.json().message);
            _this.registrationMsg.push({ severity: 'error', summary: 'Error ', detail: 'Registration Unsucessfull' });
        }, function () {
            _this.showloader = false;
            _this.router.navigate(['candidate/showRegistrationDetails', id]);
        });
    };
    return RegistrationComponent;
}());
RegistrationComponent = __decorate([
    core_1.Component({
        selector: 'registration',
        templateUrl: 'app/candidate/candidateRegistration.html',
        styleUrls: ['./app/candidate/candidate.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute,
        dropdown_service_1.DropdownService, router_1.Router, candidate_service_1.CandidateService])
], RegistrationComponent);
exports.RegistrationComponent = RegistrationComponent;
//# sourceMappingURL=registration.component.js.map