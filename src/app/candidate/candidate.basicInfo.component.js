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
var BasicInfoComponent = (function () {
    function BasicInfoComponent(formBuilder, route, router, candidateService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.candidateService = candidateService;
    }
    BasicInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showloader = true;
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
                _this.basicInfoForm.patchValue(_this.registartionModel);
                _this.showloader = false;
            });
        });
        this.candidateService.getPaypalPaymentDetails().subscribe(function (data) {
            _this.paymentDetails = data;
        }, function (err) {
            console.log(err);
        }, function () {
        });
        this.basicInfoForm = this.formBuilder.group({
            'id': '',
            'candidateId': '',
            'candidateName': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required])),
            'email': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern(("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"))])),
            'workMobile': new forms_1.FormControl('', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("^[0-9]{10}$")])),
        });
    };
    BasicInfoComponent.prototype.makePayment = function () {
        this.showloader = false;
        this.router.navigate(['candidate/makePayment', this.registartionModel.candidateId]);
    };
    return BasicInfoComponent;
}());
BasicInfoComponent = __decorate([
    core_1.Component({
        selector: 'registration',
        templateUrl: 'app/candidate/candidateBasicInfo.html',
        styleUrls: ['./app/candidate/candidate.css']
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, candidate_service_1.CandidateService])
], BasicInfoComponent);
exports.BasicInfoComponent = BasicInfoComponent;
//# sourceMappingURL=candidate.basicInfo.component.js.map