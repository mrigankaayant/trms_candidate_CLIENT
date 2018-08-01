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
var router_1 = require("@angular/router");
var payment_details_model_1 = require("../model/payment.details.model");
var payment_model_1 = require("../model/payment.model");
var payer_model_1 = require("../model/payer.model");
var payer_info_model_1 = require("../model/payer.info.model");
var shippingAddress_model_1 = require("../model/shippingAddress.model");
var transaction_model_1 = require("../model/transaction.model");
var itemList_model_1 = require("../model/itemList.model");
var items_model_1 = require("../model/items.model");
var amount_model_1 = require("../model/amount.model");
var details_model_1 = require("../model/details.model");
var candidate_service_1 = require("./candidate.service");
var registration_candidate_model_1 = require("../model/registration.candidate.model");
var ViewPaymentDetailsComponent = (function () {
    function ViewPaymentDetailsComponent(router, route, candidateService) {
        this.router = router;
        this.route = route;
        this.candidateService = candidateService;
    }
    ViewPaymentDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.registartionModel = new registration_candidate_model_1.RegistartionModel();
        //paymentDetail.paymentInfo.transactions.itemList.items 
        this.paymentDetail = new payment_details_model_1.PaymentDetails();
        this.paymentDetail.paymentInfo = new payment_model_1.Payment();
        this.paymentDetail.paymentInfo.payer = new payer_model_1.Payer();
        this.paymentDetail.paymentInfo.payer.payerInfo = new payer_info_model_1.PayerInfo();
        this.paymentDetail.paymentInfo.payer.payerInfo.shippingAddress = new shippingAddress_model_1.ShippingAddress();
        this.paymentDetail.paymentInfo.transactions = new transaction_model_1.Transaction();
        this.paymentDetail.paymentInfo.transactions.itemList = new itemList_model_1.ItemList();
        this.paymentDetail.paymentInfo.transactions.itemList.item = new items_model_1.Item();
        this.paymentDetail.paymentInfo.transactions.amount = new amount_model_1.Amount();
        this.paymentDetail.paymentInfo.transactions.amount.details = new details_model_1.Details();
        this.candidateService.getPaypalPaymentDetails().subscribe(function (data) {
            _this.paymentDetails = data;
            _this.index = _this.paymentDetails.length - 1;
            _this.paymentDetail = _this.paymentDetails[_this.paymentDetails.length - 1];
            console.log(_this.paymentDetails[0]);
        }, function (err) {
            console.log(err);
        }, function () {
        });
        this.candidateService.getUserType().subscribe(function (data) {
            _this.userMst = data;
            _this.id = _this.userMst.userId;
        }, function (err) {
            console.log(err);
        }, function () {
            _this.candidateService.getCandidateDetailsByUserId(_this.userMst.userId).subscribe(function (data) {
                _this.candidateId = data.candidateId;
                _this.registartionModel = data;
            }, function (err) {
                console.log(err);
            }, function () {
            });
        });
    };
    ViewPaymentDetailsComponent.prototype.payment = function (index) {
        console.log(index);
        this.index = index;
        this.paymentDetail = this.paymentDetails[index];
        console.log(this.paymentDetail);
    };
    ViewPaymentDetailsComponent.prototype.goToRegistraion = function () {
        this.router.navigate(['candidate/registration']);
    };
    ViewPaymentDetailsComponent.prototype.anotherPayment = function () {
        this.router.navigate(['candidate/candidateAnotherPayment', this.id]);
    };
    return ViewPaymentDetailsComponent;
}());
ViewPaymentDetailsComponent = __decorate([
    core_1.Component({
        selector: 'success',
        templateUrl: 'app/candidate/viewPaymentDetails.html',
        styleUrls: ['./app/candidate/candidate.css']
    }),
    __metadata("design:paramtypes", [router_1.Router, router_1.ActivatedRoute, candidate_service_1.CandidateService])
], ViewPaymentDetailsComponent);
exports.ViewPaymentDetailsComponent = ViewPaymentDetailsComponent;
//# sourceMappingURL=candidate.viewPaymentDetails.component.js.map