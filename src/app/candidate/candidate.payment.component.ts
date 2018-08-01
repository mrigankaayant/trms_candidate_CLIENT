import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators,FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DropdownService } from '../util/dropdown.service';
import { SelectItem, Message, LazyLoadEvent, TabViewModule,
	     SplitButtonModule, MenubarModule,MenuItem, TabMenuModule,MessagesModule,MessageModule} from 'primeng/primeng';

import{CandidateService} from './candidate.service';
import { UserMst } from '../model/user.mst.model';
import { PaymentModel } from '../model/candidate.payment.model';
import {RegistartionModel} from'../model/registration.candidate.model';
import {CandidateSelectedCourse} from'../model/candidate.selcted.course.model';
import { CandidateCourse } from '../model/candidate.course.model';
import {Candidate} from'../model/candidate.model';

@Component({

	selector: 'payment',
	templateUrl: 'app/candidate/paymentForm.html',
	styleUrls: ['./app/candidate/candidate.css']
})

export class PaymentComponent {

    id:string;
    paymentForm: FormGroup;
	addCourseForm:FormGroup;
	canSkills: SelectItem[];
	showloader:boolean;
	registartionModel:RegistartionModel;
	userMst:UserMst;
	displayAddCourseModel:boolean = false;
	candidateSelectedCourse:CandidateSelectedCourse;
	candidateCourse:CandidateCourse;
	candidate:Candidate;
	msgs: Message[] = [];
	selectedCancourse:SelectItem[];
	canCourse:any[];
	constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,
	private dropdownService: DropdownService,private router: Router,private candidateService:CandidateService) {
	  	
	}

	ngOnInit() {
			this.msgs =[];
		    this.showloader = true;
			this.registartionModel = new RegistartionModel();
			this.candidateSelectedCourse = new CandidateSelectedCourse();
			this.candidateCourse = new CandidateCourse();
			this.candidate = new Candidate();
			this.candidateSelectedCourse.candidateFinalCourses = new Array<CandidateCourse>();
			this.selectedCancourse = [];
			this.canCourse = [];

				this.candidateService.getUserType().subscribe(
         data => {
			        this.userMst = data;	

         },
         err => {
                console.log(err);
         },
        () => { 
            this.id = this.userMst.userId;

		this.candidateService.getCandidateDetailsByUserId(this.id).subscribe(
         data => {
			        
                    this.registartionModel = data;
					console.log(data);
					if(this.registartionModel.candidateCourses.length > 0){
						console.log("Enter")
						this.canCourse.push({ label: 'Select Course', value: "" });
						for(let e of this.registartionModel.candidateCourses){
							this.canCourse.push({ label: e.course, value: e.course })
							
						}
						this.selectedCancourse = this.canCourse;
					}

					if(this.registartionModel.registrationDate !=null){
						console.log("Enter IF Block");
	
						this.router.navigate(['candidate/showRegistrationDetails',this.registartionModel.candidateId]);
					}	
					
                    if(this.registartionModel.paymentCounter !=null && this.registartionModel.registrationDate ==null){
						console.log("Enter IF Block");
	
						this.router.navigate(['candidate/registration']);
					}
         },
         err => {
                console.log(err);
         },
        () => { 
			console.log(this.registartionModel.candidateId);
			this.paymentForm.patchValue(this.registartionModel);
			this.showloader = false;
		} 
        );
		} 
        );


		    //this.showloader = false;
		    this.canSkills = [];
            
			this.canSkills = this.dropdownService.skills;
        	this.paymentForm = this.formBuilder.group({
			'coureseName': new FormControl('', Validators.compose([Validators.required])),
			'amount': new FormControl('', Validators.compose([Validators.required])),
			'candidateName': new FormControl('', Validators.compose([Validators.required])),
			'email': new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")])),
			'workMobile': new FormControl('',  Validators.compose([Validators.required,Validators.pattern("^[0-9]{10}$")])),
			'pricePerItem': new FormControl('', Validators.compose([Validators.required])),
			'quantity': new FormControl('1', Validators.compose([Validators.required])),
			'returnUrl':new FormControl('http://192.168.0.85:3000/candidate/viewpaymentdetails'),
			'candidateId':new FormControl(this.registartionModel.candidateId)
		});

		this.addCourseForm = this.formBuilder.group({
			'allSkill':new FormControl('', Validators.compose([Validators.required]))
		});

    }

    paymentThroughPaypal(){

		if(this.paymentForm.valid == false){
			console.log("First Block")
			if(this.paymentForm.value.coureseName == null || this.paymentForm.value.coureseName == ''){
				this.paymentForm.controls['coureseName'].markAsDirty();
			}

			if(this.paymentForm.value.amount == null || this.paymentForm.value.amount == ''){
				this.paymentForm.controls['amount'].markAsDirty();
			}

			if(this.paymentForm.value.firstName == null || this.paymentForm.value.firstName == ''){
				this.paymentForm.controls['firstName'].markAsDirty();
			}

			if(this.paymentForm.value.lastName == null || this.paymentForm.value.lastName == ''){
				this.paymentForm.controls['lastName'].markAsDirty();
			}

			if(this.paymentForm.value.email == null || this.paymentForm.value.email == ''){
				this.paymentForm.controls['email'].markAsDirty();
			}

			if(this.paymentForm.value.phone == null || this.paymentForm.value.phone == ''){
				this.paymentForm.controls['phone'].markAsDirty();
			}

			if(this.paymentForm.value.pricePerItem == null || this.paymentForm.value.pricePerItem == ''){
				this.paymentForm.controls['pricePerItem'].markAsDirty();
			}

			if(this.paymentForm.value.quantity == null || this.paymentForm.value.quantity == ''){
				this.paymentForm.controls['quantity'].markAsDirty();
			}
		}

	if(this.paymentForm.valid == true){
       this.candidateService.makePayment(this.paymentForm.value).subscribe(
            data => {
				 window.location.href = data.redirect_url;
            },
            err => {
                console.log(err.json().message)
                
            },
            () => { 
					this.showloader = true;
				 	console.log("success");
            }
        ); 
	  }
    }
   
   addAnotherCourse(){
		this.displayAddCourseModel = true;
	}

	addCourses(){
		    this.candidateSelectedCourse = new CandidateSelectedCourse();
			this.candidateSelectedCourse.candidateFinalCourses = new Array<CandidateCourse>();
		for (let i in this.addCourseForm.value.allSkill){
			this.candidateCourse = new CandidateCourse();
			
			this.candidateCourse.course = this.addCourseForm.value.allSkill[i];
			
			console.log(this.addCourseForm.value.allSkill[i]);
			this.candidateSelectedCourse.candidateFinalCourses.push(this.candidateCourse);
		}
		
		
		for(let i in this.registartionModel.candidateCourses){
			this.candidateSelectedCourse.candidateFinalCourses.push(this.registartionModel.candidateCourses[i]);
		}
	   
		this.candidateSelectedCourse.candidateId = this.registartionModel.candidateId;
		console.log(this.candidateSelectedCourse);

		this.candidateService.updateCourse(this.candidateSelectedCourse).subscribe(
			
            data => {
				
				this.candidate = data;
				if(this.candidate.candidateCourses.length > 0){
						console.log("Enter")
						this.selectedCancourse = [];
						this.canCourse = [];
						this.canCourse.push({ label: 'Select Course', value: "" });
						for(let e of this.candidate.candidateCourses){
							this.canCourse.push({ label: e.course, value: e.course })
							
						}
						this.selectedCancourse = this.canCourse;
					}
            },
            err => {
                console.log(err.json().message);
				 this.msgs = [];
        		 this.msgs.push({severity:'error', summary:'Course Not Added'});
                
            },
            () => { 
					this.displayAddCourseModel = false;
				 	console.log("success");
					 this.msgs = [];
        			 this.msgs.push({severity:'success', summary:'Course Successfully Added'});
            }
        ); 

	
		
}

}