import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators,FormArray } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DropdownService } from '../util/dropdown.service';
import { SelectItem, Message, LazyLoadEvent, TabViewModule,
	     SplitButtonModule, MenubarModule,MenuItem, TabMenuModule} from 'primeng/primeng';

import{CandidateService} from './candidate.service';
import { UserMst } from '../model/user.mst.model';
import { RegistartionModel } from '../model/registration.candidate.model';
import { SocialMedia } from '../model/social.media.model';
import { PreferredLocation } from '../model/preferred.location.model';
import { Immigration } from '../model/candidate.imigration.model';
import { Phone } from '../model/phone.model';
import { WorkExperience } from '../model/workexperience.model';
import { Skill } from '../model/skill.model';
import { Education } from '../model/education.model'; 


@Component({

	selector: 'registration',
	templateUrl: 'app/candidate/candidateRegistration.html',
	styleUrls: ['./app/candidate/candidate.css']
})

export class RegistrationComponent {
	
	visaList:SelectItem[];
	addCandidateForm: FormGroup;
	gender: SelectItem[];
    id:string;
	userMst:UserMst;
	registartionModel:RegistartionModel = new RegistartionModel();
	visaStatus:SelectItem[];
	educationType:SelectItem[];
	gradingSystemList:SelectItem[];
	specializationList:SelectItem[];
	registrationMsg: Message[] = [];
	showloader:boolean;
	showMenu:boolean;
	employmentTypes:SelectItem[];
	workAuthorizations:SelectItem[];
	

	constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,
	private dropdownService: DropdownService,private router: Router,private candidateService:CandidateService) {
	  
		
	}

	ngOnInit() {

		this.showloader = true;
		this.gradingSystemList = [];
        this.specializationList = [];
		this.registrationMsg = [];
		this.showMenu = false;

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
					if(this.registartionModel.registrationDate !=null){
						console.log("Enter IF Block");
						this.showMenu = true;
						this.router.navigate(['candidate/showRegistrationDetails',this.registartionModel.candidateId]);
					}	
					
         },
         err => {
                console.log(err);
         },
        () => { 

			if(this.registartionModel.dateOfBirth !=null){
				this.registartionModel.dateOfBirth = new Date(this.registartionModel.dateOfBirth);
			}

			if(this.registartionModel.visas !=null){
				for(var i = 0; i < this.registartionModel.visas.length; i++){
					this.registartionModel.visas[i].startDate = new Date(this.registartionModel.visas[i].startDate);
					this.registartionModel.visas[i].endDate = new Date(this.registartionModel.visas[i].endDate);
				}
			}
			//this.addCandidateForm.controls['id'].setValue();
			console.log(this.registartionModel.candidateId);
			this.addCandidateForm.patchValue(this.registartionModel);
			this.showloader = false;
		} 
        );
		} 
        );

		
        
		this.gender = [
            {label:'Select Gender', value:''},
            {label:'Male', value:'Male'},
            {label:'Female', value:'Female'}
        ];

		this.visaList = this.dropdownService.candidateVisa;
		this.gradingSystemList = this.dropdownService.gradingSystem;
		this.specializationList = this.dropdownService.specialization;
		this.employmentTypes = this.dropdownService.employmentTypes;
		this.workAuthorizations = this.dropdownService.workAuthorization;

		this.visaStatus = [
			 {label:'Select Status', value:''},
            {label:'Active', value:'Active'},
            {label:'Inactive', value:'Inactive'}
		];

		this.educationType = [
            {label:'Select Education Type', value:''},
            {label:'Part Time', value:'Part Time'},
            {label:'Full Time', value:'Full Time'}
        ];
        
		this.addCandidateForm = this.formBuilder.group({
			'id':'',
			'candidateId':'',
			'candidateName': new FormControl('', Validators.compose([Validators.required])),
			'dateOfBirth': new FormControl('', Validators.compose([Validators.required])),
			'gender': new FormControl('', Validators.compose([Validators.required])),
			'email': new FormControl('', Validators.compose([Validators.required, Validators.pattern(("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"))])),
			'alternateEmail': new FormControl('', Validators.compose([Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")])),
			'workMobile': new FormControl('',  Validators.compose([Validators.required,Validators.pattern("^[0-9]{10}$")])),
			'homeMobile': new FormControl('', Validators.compose([Validators.pattern("^[0-9]{10}$")])),
			'country': new FormControl('', Validators.compose([Validators.required])),
			'state': new FormControl('', Validators.compose([Validators.required])),
			'city':  new FormControl('', Validators.compose([Validators.required])),
			'zip':  new FormControl('', Validators.compose([Validators.required])),
			'street':new FormControl('', Validators.compose([Validators.required])),
			'currentLocation': '', 
			'employmentTypes':'',
			'workAuthorization':'',
			'preferredLocations': this.formBuilder.array([
                this.initPreferredLocations()
            ]),
			'visas':this.formBuilder.array([
                this.initVisa()
            ]),
			'workExperiences':this.formBuilder.array([
                this.initWorkExprience()
			]),
			'skills':this.formBuilder.array([
                 this.initSkill()
			]),
			'educations':this.formBuilder.array([
                 this.initEducation()
			]),
			'linkedinUrl':'',
			'twitterUrl':'',
			'facebookUrl':'',
			'personalWebsite':''
		});
    
		
	}

 initPreferredLocations() {
        return this.formBuilder.group({
            'location':''
        });
    }

 addPreferredLocations() {
    const control = <FormArray>this.addCandidateForm.controls['preferredLocations'];
    control.push(this.initPreferredLocations());
 }

 removePreferredLocations(i: number) {
    const control = <FormArray>this.addCandidateForm.controls['preferredLocations'];
    control.removeAt(i);
 } 

 

initVisa(){
	return this.formBuilder.group({
		'immigrationType':'',
		'startDate':'',
		'endDate':'',
		'status':''
	});
}

initWorkExprience(){
	return this.formBuilder.group({
		'jobTitle':'',
		'companyName':'',
		'startDate':'',
		'endDate':''
	});
}

initSkill(){
     return this.formBuilder.group({
		'skillName':'',
		'yearsExp':'',
		'lastUsed':''
	});
}


initEducation(){
     return this.formBuilder.group({
		'highestDegree':'',
		'institution':'',
		'cityOrState':'',
		'country':''
	});
}



addVisa() {
    const control = <FormArray>this.addCandidateForm.controls['visas'];
    control.push(this.initVisa());
 }

 addWorkExprience(){
	 const control = <FormArray>this.addCandidateForm.controls['workExperiences'];
     control.push(this.initWorkExprience());
 }

 addSkill(){
	 const control = <FormArray>this.addCandidateForm.controls['skills'];
     control.push(this.initSkill());
 }

 addEducation(){
	 const control = <FormArray>this.addCandidateForm.controls['educations'];
     control.push(this.initEducation());
 }


removeVisa(i: number) {
    const control = <FormArray>this.addCandidateForm.controls['visas'];
    control.removeAt(i);
 } 

 removeWorkExprience(i: number) {
    const control = <FormArray>this.addCandidateForm.controls['workExperiences'];
    control.removeAt(i);
 } 

 removeSkill(i: number) {
    const control = <FormArray>this.addCandidateForm.controls['skills'];
    control.removeAt(i);
 } 

 removeEducation(i: number) {
    const control = <FormArray>this.addCandidateForm.controls['educations'];
    control.removeAt(i);
 } 


 setVisa(i:Immigration){
	 return this.formBuilder.group({
		immigrationType:new FormControl(i.immigrationType),
		startDate:new FormControl(i.startDate),
		endDate:new FormControl(i.endDate),
		status:new FormControl(i.status)
	});
 }

 setWorkExprience(w:WorkExperience){ 
	 return this.formBuilder.group({
		jobTitle:new FormControl(w.jobTitle),
		companyName:new FormControl(w.companyName),
		startDate:new FormControl(w.startDate),
		endDate:new FormControl(w.endDate)
	});
 }

 setSkill(s:Skill){ 
	 return this.formBuilder.group({
		skillName:new FormControl(s.skillName),
		yearsExp:new FormControl(s.yearsExp),
		lastUsed:new FormControl(s.lastUsed)
	});
 }

 setEducation(e:Education){ 
	 return this.formBuilder.group({
		highestDegree:new FormControl(e.highestDegree),
		institution:new FormControl(e.institution),
		cityOrState:new FormControl(e.cityOrState),
		country:new FormControl(e.country)
	});
 }


 saveRegistration() {

		 this.registrationMsg = [];
		 var id:string;
		 this.showloader = true;
		 this.candidateService.saveRegistration(this.addCandidateForm.value).subscribe(
            data => {
				id = data.candidateId;
                this.registrationMsg.push({ severity: 'success', summary: 'Success', detail: 'Registerd Successfully' });
            },
            err => {
                console.log(err.json().message)
                this.registrationMsg.push({ severity: 'error', summary: 'Error ', detail: 'Registration Unsucessfull' });
            },
            () => { 
				 	this.showloader = false;
					this.router.navigate(['candidate/showRegistrationDetails',id]);
            }
        ); 
	}
    
	
	

}