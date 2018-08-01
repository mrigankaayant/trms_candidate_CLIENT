import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators,FormArray } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserMst } from '../model/user.mst.model';

import{CandidateService} from './candidate.service';



@Component({

	selector: 'cancel',
	templateUrl: 'app/candidate/cancelPayment.html',
	styleUrls: ['./app/candidate/candidate.css']
})

export class PaymentCancelComponent {
	
	paymentId:string;
    payerId:string;
	userMst:UserMst;
    candidateId:string;

	constructor(private router: Router,private route: ActivatedRoute,private candidateService:CandidateService) {
	  
		
	}

	ngOnInit() {
           
			
    }

    goToPaymentForm(){
       //sessionStorage.clear();
       //this.router.navigate(['login']);
	   this.candidateService.getUserType().subscribe(
         data => {
			        this.userMst = data;
         },
         err => {
                console.log(err);
         },
        () => {
			this.candidateService.getCandidateDetailsByUserId(this.userMst.userId).subscribe(
         data => {
			       this.candidateId = data.candidateId;
         },
         err => {
                console.log(err);
         },
        () => { 
			this.router.navigate(['candidate/makePayment',this.candidateId]);
		}
  );
		}
  )
	}
}

