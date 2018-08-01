import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators,FormArray } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import {PaymentDetails} from '../model/payment.details.model';
import{Payment} from '../model/payment.model';
import{Payer} from '../model/payer.model';
import {PayerInfo} from '../model/payer.info.model';
import {ShippingAddress} from '../model/shippingAddress.model';
import {Transaction} from '../model/transaction.model';
import {ItemList} from '../model/itemList.model';
import {Item} from '../model/items.model';
import {Amount} from '../model/amount.model';
import {Details} from '../model/details.model';
import {UserMst} from '../model/user.mst.model';
import{CandidateService} from './candidate.service';
import {RegistartionModel} from'../model/registration.candidate.model';


@Component({

	selector: 'success',
	templateUrl: 'app/candidate/viewPaymentDetails.html',
	styleUrls: ['./app/candidate/candidate.css']
})

export class ViewPaymentDetailsComponent {
	
	paymentDetails:PaymentDetails[];
    paymentDetail:PaymentDetails;
    index:number;
    userMst:UserMst;
    candidateId:string;
    registartionModel:RegistartionModel;
    showButton:boolean;
    id:string;

	constructor(private router: Router,private route: ActivatedRoute,private candidateService:CandidateService) {
	  	
	}

	ngOnInit() {
           this.registartionModel = new RegistartionModel();
        //paymentDetail.paymentInfo.transactions.itemList.items 
           this.paymentDetail = new PaymentDetails();
           this.paymentDetail.paymentInfo = new Payment();
           this.paymentDetail.paymentInfo.payer = new Payer();
           this.paymentDetail.paymentInfo.payer.payerInfo = new PayerInfo();
           this.paymentDetail.paymentInfo.payer.payerInfo.shippingAddress = new ShippingAddress();
           this.paymentDetail.paymentInfo.transactions = new Transaction();
           this.paymentDetail.paymentInfo.transactions.itemList = new ItemList();
           this.paymentDetail.paymentInfo.transactions.itemList.item = new Item();
           this.paymentDetail.paymentInfo.transactions.amount = new Amount();
           this.paymentDetail.paymentInfo.transactions.amount.details = new Details();
           this.candidateService.getPaypalPaymentDetails().subscribe(
         data => {
			 this.paymentDetails = data;
             this.index = this.paymentDetails.length - 1;
             this.paymentDetail = this.paymentDetails[this.paymentDetails.length - 1];
			 console.log(this.paymentDetails[0]);
         },
         err => {
                console.log(err);
         },
        () => { 
            
		} 
        );


    this.candidateService.getUserType().subscribe(
         data => {
			        this.userMst = data;
                    this.id = this.userMst.userId;
         },
         err => {
                console.log(err);
         },
        () => {
			this.candidateService.getCandidateDetailsByUserId(this.userMst.userId).subscribe(
                data => {
                        this.candidateId = data.candidateId;
                        this.registartionModel = data;
                },
                err => {
                        console.log(err);
                },
                () => { 
                    
                }
            );
		}
    )

    }
			
    
    payment(index:number){
        console.log(index);
        this.index = index;
       this.paymentDetail =  this.paymentDetails[index];
        console.log( this.paymentDetail);
    }
    
    goToRegistraion(){
     
     this.router.navigate(['candidate/registration']);
}

anotherPayment(){
    
     this.router.navigate(['candidate/candidateAnotherPayment',this.id]);
}

}