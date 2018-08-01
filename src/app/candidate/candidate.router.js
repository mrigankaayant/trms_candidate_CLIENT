"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var registration_component_1 = require("./registration.component");
var candidate_showRegistration_component_1 = require("./candidate.showRegistration.component");
var candidate_enrollment_component_1 = require("./candidate.enrollment.component");
var candidate_payment_component_1 = require("./candidate.payment.component");
var candidate_viewPaymentDetails_component_1 = require("./candidate.viewPaymentDetails.component");
var candidate_paymentCancelComponent_1 = require("./candidate.paymentCancelComponent");
var candidate_logout_component_1 = require("./candidate.logout.component");
var candidate_another_payment_component_1 = require("./candidate.another.payment.component");
var candidate_payment_error_component_1 = require("./candidate.payment.error.component");
var router = [
    { path: '', redirectTo: 'makePayment', pathMatch: 'full' },
    { path: 'makePayment', component: candidate_payment_component_1.PaymentComponent },
    { path: 'registration', component: registration_component_1.RegistrationComponent },
    { path: 'showRegistrationDetails/:id', component: candidate_showRegistration_component_1.RegistrationDetails },
    { path: 'candidateAnotherPayment/:id', component: candidate_another_payment_component_1.AnotherPaymentComponent },
    { path: 'enrollment/:id', component: candidate_enrollment_component_1.EnrollmentComponent },
    { path: 'viewpaymentdetails', component: candidate_viewPaymentDetails_component_1.ViewPaymentDetailsComponent },
    { path: 'cancelpayment', component: candidate_paymentCancelComponent_1.PaymentCancelComponent },
    { path: 'errorpayment', component: candidate_payment_error_component_1.PaymentErrorComponent },
    { path: 'logout', component: candidate_logout_component_1.LogOutComponent },
];
var CandidateRoutingModule = (function () {
    function CandidateRoutingModule() {
    }
    return CandidateRoutingModule;
}());
CandidateRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(router)],
        exports: [router_1.RouterModule]
    })
], CandidateRoutingModule);
exports.CandidateRoutingModule = CandidateRoutingModule;
//# sourceMappingURL=candidate.router.js.map