import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators,FormArray } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Component({

	selector: 'success',
	templateUrl: 'app/successPayment.html',
	styleUrls: ['./app/candidate/candidate.css']
})

export class SuccessComponent {
	
	paymentId:string;
    payerId:string;

	constructor(private router: Router,private route: ActivatedRoute) {
	  
		
	}

	ngOnInit() {
           
			
    }

    goToLogin(){
       //sessionStorage.clear();
       //this.router.navigate(['login']);
       this.router.navigate(['/candidate/viewpaymentdetails',]);
    }
}