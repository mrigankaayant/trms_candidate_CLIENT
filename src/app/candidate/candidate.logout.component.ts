import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators,FormArray } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import{CandidateService} from './candidate.service';



@Component({

	templateUrl: '/app/candidate/logout.html',
	
})

export class LogOutComponent {
	
	showloader:boolean;

	constructor(private router: Router,private route: ActivatedRoute,private candidateService:CandidateService) {
        console.log("Enter");
       this.showloader = true;
      
	}

    ngOnInit(){
       sessionStorage.clear();
       this.router.navigate(['login']);
        }
    

	
}