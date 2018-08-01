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
var candidate_selcted_course_model_1 = require("../model/candidate.selcted.course.model");
var candidate_course_model_1 = require("../model/candidate.course.model");
var candidate_model_1 = require("../model/candidate.model");
var PaymentComponent = (function () {
    function PaymentComponent(formBuilder, route, dropdownService, router, candidateService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.dropdownService = dropdownService;
        this.router = router;
        this.candidateService = candidateService;
        this.displayAddCourseModel = false;
        this.msgs = [];
    }
    PaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.msgs = [];
        this.showloader = true;
        this.registartionModel = new registration_candidate_model_1.RegistartionModel();
        this.candidateSelectedCourse = new candidate_selcted_course_model_1.CandidateSelectedCourse();
        this.candidateCourse = new candidate_course_model_1.CandidateCourse();
        this.candidate = new candidate_model_1.Candidate();
        this.candidateSelectedCourse.candidateFinalCourses = new Array();
        this.selectedCancourse = [];
        this.canCourse = [];
        this.candidateService.getUserType().subscribe(function (data) {
            _this.userMst = data;
        }, function (err) {
            console.log(err);
        }, function () {
            _this.id = _this.userMst.userId;
            _this.candidateService.getCandidateDetailsByUserId(_this.id).subscribe(function (data) {
                _this.registartionModel = data;
                console.log(data);
                if (_this.registartionModel.candidateCourses.length > 0) {
                    console.log("Enter");
                    _this.canCourse.push({ label: 'Select Course', value: "" });
                    for (var _i = 0, _a = _this.registartionModel.candidateCourses; _i < _a.length; _i++) {
                        var e = _a[_i];
                        _this.canCourse.push({ label: e.course, value: e.course });
                    }
                    _this.selectedCancourse = _this.canCourse;
                }
                if (_this.registartionModel.registrationDate != null) {
                    console.log("Enter IF Block");
                    _this.router.navigate(['candidate/showRegistrationDetails', _this.registartionModel.candidateId]);
                }
                if (_this.registartionModel.paymentCounter != null && _this.registartionModel.registrationDate == null) {
                    console.log("Enter IF Block");
                    _this.router.navigate(['candidate/registration']);
                }
            }, function (err) {
                console.log(err);
            }, function () {
                console.log(_this.registartionModel.candidateId);
                _this.paymentForm.patchValue(_this.registartionModel);
                _this.showloader = false;
            });
        });
        //this.showloader = false;
        this.canSkills = [];
        this.canSkills = this.dropdownService.skills;
        this.paymentForm = this.formBuilder.group({
            'coureseName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'amount': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'candidateName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'email': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")])),
            'workMobile': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("^[0-9]{10}$")])),
            'pricePerItem': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'quantity': new forms_1.FormControl('1', forms_1.Validators.compose([forms_1.Validators.required])),
            'returnUrl': new forms_1.FormControl('http://192.168.0.85:3000/candidate/viewpaymentdetails'),
            'candidateId': new forms_1.FormControl(this.registartionModel.candidateId)
        });
        this.addCourseForm = this.formBuilder.group({
            'allSkill': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required]))
        });
    };
    PaymentComponent.prototype.paymentThroughPaypal = function () {
        var _this = this;
        if (this.paymentForm.valid == false) {
            console.log("First Block");
            if (this.paymentForm.value.coureseName == null || this.paymentForm.value.coureseName == '') {
                this.paymentForm.controls['coureseName'].markAsDirty();
            }
            if (this.paymentForm.value.amount == null || this.paymentForm.value.amount == '') {
                this.paymentForm.controls['amount'].markAsDirty();
            }
            if (this.paymentForm.value.firstName == null || this.paymentForm.value.firstName == '') {
                this.paymentForm.controls['firstName'].markAsDirty();
            }
            if (this.paymentForm.value.lastName == null || this.paymentForm.value.lastName == '') {
                this.paymentForm.controls['lastName'].markAsDirty();
            }
            if (this.paymentForm.value.email == null || this.paymentForm.value.email == '') {
                this.paymentForm.controls['email'].markAsDirty();
            }
            if (this.paymentForm.value.phone == null || this.paymentForm.value.phone == '') {
                this.paymentForm.controls['phone'].markAsDirty();
            }
            if (this.paymentForm.value.pricePerItem == null || this.paymentForm.value.pricePerItem == '') {
                this.paymentForm.controls['pricePerItem'].markAsDirty();
            }
            if (this.paymentForm.value.quantity == null || this.paymentForm.value.quantity == '') {
                this.paymentForm.controls['quantity'].markAsDirty();
            }
        }
        if (this.paymentForm.valid == true) {
            this.candidateService.makePayment(this.paymentForm.value).subscribe(function (data) {
                window.location.href = data.redirect_url;
            }, function (err) {
                console.log(err.json().message);
            }, function () {
                _this.showloader = true;
                console.log("success");
            });
        }
    };
    PaymentComponent.prototype.addAnotherCourse = function () {
        this.displayAddCourseModel = true;
    };
    PaymentComponent.prototype.addCourses = function () {
        var _this = this;
        this.candidateSelectedCourse = new candidate_selcted_course_model_1.CandidateSelectedCourse();
        this.candidateSelectedCourse.candidateFinalCourses = new Array();
        for (var i in this.addCourseForm.value.allSkill) {
            this.candidateCourse = new candidate_course_model_1.CandidateCourse();
            this.candidateCourse.course = this.addCourseForm.value.allSkill[i];
            console.log(this.addCourseForm.value.allSkill[i]);
            this.candidateSelectedCourse.candidateFinalCourses.push(this.candidateCourse);
        }
        for (var i in this.registartionModel.candidateCourses) {
            this.candidateSelectedCourse.candidateFinalCourses.push(this.registartionModel.candidateCourses[i]);
        }
        this.candidateSelectedCourse.candidateId = this.registartionModel.candidateId;
        console.log(this.candidateSelectedCourse);
        this.candidateService.updateCourse(this.candidateSelectedCourse).subscribe(function (data) {
            _this.candidate = data;
            if (_this.candidate.candidateCourses.length > 0) {
                console.log("Enter");
                _this.selectedCancourse = [];
                _this.canCourse = [];
                _this.canCourse.push({ label: 'Select Course', value: "" });
                for (var _i = 0, _a = _this.candidate.candidateCourses; _i < _a.length; _i++) {
                    var e = _a[_i];
                    _this.canCourse.push({ label: e.course, value: e.course });
                }
                _this.selectedCancourse = _this.canCourse;
            }
        }, function (err) {
            console.log(err.json().message);
            _this.msgs = [];
            _this.msgs.push({ severity: 'error', summary: 'Course Not Added' });
        }, function () {
            _this.displayAddCourseModel = false;
            console.log("success");
            _this.msgs = [];
            _this.msgs.push({ severity: 'success', summary: 'Course Successfully Added' });
        });
    };
    return PaymentComponent;
}());
PaymentComponent = __decorate([
    core_1.Component({
        selector: 'payment',
        templateUrl: 'app/candidate/paymentForm.html',
        styleUrls: ['./app/candidate/candidate.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute,
        dropdown_service_1.DropdownService, router_1.Router, candidate_service_1.CandidateService])
], PaymentComponent);
exports.PaymentComponent = PaymentComponent;
//# sourceMappingURL=candidate.payment.component.js.map