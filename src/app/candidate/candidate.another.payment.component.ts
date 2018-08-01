import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators,FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DropdownService } from '../util/dropdown.service';
import { SelectItem, Message, LazyLoadEvent, TabViewModule,MessagesModule,MessageModule,
	     SplitButtonModule, MenubarModule,MenuItem, TabMenuModule,MultiSelectModule} from 'primeng/primeng';

import{CandidateService} from './candidate.service';
import { UserMst } from '../model/user.mst.model';
import { PaymentModel } from '../model/candidate.payment.model';
import {RegistartionModel} from'../model/registration.candidate.model';
import {Skill} from'../model/skill.model';
import {CandidateSelectedCourse} from'../model/candidate.selcted.course.model';
import { CandidateCourse } from '../model/candidate.course.model';
import {Candidate} from'../model/candidate.model';
@Component({

	selector: 'another-payment',
	templateUrl: 'app/candidate/anotherPaymentForm.html',
	styleUrls: ['./app/candidate/candidate.css']
})

export class AnotherPaymentComponent {

    id:string;
    paymentForm: FormGroup;
	addCourseForm:FormGroup;
	canSkills: SelectItem[];
	showloader:boolean;
	registartionModel:RegistartionModel;
	userMst:UserMst;
    canCourse:any[];
	selectedCancourse:SelectItem[];
	finalCourse:Skill[];
	candidateSelectedCourse:CandidateSelectedCourse;
	candidateCourse:CandidateCourse;
	displayAddCourseModel:boolean = false;
	candidate:Candidate;
	msgs: Message[] = [];
	constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,
	private dropdownService: DropdownService,private router: Router,private candidateService:CandidateService) {
	  	
	}

	ngOnInit() {
			this.msgs =[];
			//this.displayAddCourseModel = false;
			this.candidate = new Candidate();
			this.candidateCourse = new CandidateCourse();
			this.candidateSelectedCourse = new CandidateSelectedCourse();
			this.candidateSelectedCourse.candidateFinalCourses = new Array<CandidateCourse>();
			this.registartionModel = new RegistartionModel();
            let id = this.route.snapshot.params["id"];
			this.finalCourse = [];
			this.canCourse = [];
			this.selectedCancourse = [];
			this.canSkills = [];
			this.canSkills = this.dropdownService.skills;

		this.candidateService.getCandidateDetailsByUserId(id).subscribe(
         data => {
			        
                    this.registartionModel = data;
					console.log(this.registartionModel);
					 
					if(this.registartionModel.candidateCourses.length > 0 && this.registartionModel.candidateCourses.length!=null){
						console.log("Enter")
						this.canCourse.push({ label: 'Select Course', value: "" });
						for(let e of this.registartionModel.candidateCourses){
							this.canCourse.push({ label: e.course, value: e.course });
							
						}
						this.selectedCancourse = this.canCourse;
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
		
       


		    //this.showloader = false;
		    
        	this.paymentForm = this.formBuilder.group({
			'coureseName': new FormControl('', Validators.compose([Validators.required])),
			'amount': new FormControl('', Validators.compose([Validators.required])),
			'candidateName': new FormControl('', Validators.compose([Validators.required])),
			'email': new FormControl('', Validators.compose([Validators.required,Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")])),
			'workMobile': new FormControl('',  Validators.compose([Validators.required,Validators.pattern("^[0-9]{10}$")])),
			'pricePerItem': new FormControl('', Validators.compose([Validators.required])),
			'quantity': new FormControl('1', Validators.compose([Validators.required])),
			'returnUrl':new FormControl('http://192.168.0.79:3000/candidate/viewpaymentdetails'),
			'candidateId':new FormControl(this.registartionModel.candidateId),
			
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

			if(this.paymentForm.value.candidateName == null || this.paymentForm.value.candidateName == ''){
				this.paymentForm.controls['candidateName'].markAsDirty();
			}
			if(this.paymentForm.value.email == null || this.paymentForm.value.email == ''){
				this.paymentForm.controls['email'].markAsDirty();
			}

			if(this.paymentForm.value.workMobile == null || this.paymentForm.value.workMobile == ''){
				this.paymentForm.controls['workMobile'].markAsDirty();
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
				if(this.candidate.candidateCourses.length > 0 && this.candidate.candidateCourses != null){
						this.selectedCancourse = [];
						this.canCourse = [];
						console.log("Enter")
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