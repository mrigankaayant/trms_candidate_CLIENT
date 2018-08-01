import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators,FormArray } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DropdownService } from '../util/dropdown.service';
import { SelectItem, Message, LazyLoadEvent, TabViewModule,
	     SplitButtonModule, MenubarModule,MenuItem, TabMenuModule} from 'primeng/primeng';

import {CandidateService} from './candidate.service';




@Component({

	selector: 'enrollment',
	templateUrl: 'app/candidate/candidateEnrollment.html',
	styleUrls: ['./app/candidate/candidate.css']
})

export class EnrollmentComponent {
	
    id:string;
    showloader:boolean;
    candidateId:string;
    candidateName:string;
    headers: Headers;
    path:string;
	showUploadedFormPath:string;
    checkForEnrollment:string;
    fileId:string;
    fileName:string;
    //pdfSrc: any;
	constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router,private candidateService:CandidateService) {
	  
		//console.log(sessionStorage.getItem("AccessToken"));
	}

	ngOnInit() {
        this.showloader = true;
        this.candidateId = this.route.snapshot.params["id"];
        this.candidateService.getEnrollmentForm(this.candidateId).subscribe(
         data => {
                  
                   this.path = data.generatedEnrollmentForm;
                   this.candidateName = data.candidateName;
                   this.fileName = data.uploadEnrollmentFormName;
                   this.checkForEnrollment = data.gender;
                   
         },
         err => {
                //console.log(err);
         },
        () => { 
            //console.log(this.id);
            this.showloader = false;
        }
        );
    }
    
    fileChange(event:any){
      const fileList: FileList = event.target.files;
      const file = fileList[0];
      const formData = new FormData();
      formData.append('file', file, file.name);
      
      this.candidateService.uploadFile(formData,this.candidateId,this.candidateName).subscribe(
         data => {

                    console.log(data);
                    this.fileName = data.uploadEnrollmentFormName;
         },
         err => {
                console.log(err);
         },
        () => { 
            //console.log(this.id);
            
        }
        );
   
    }

    viewEnrollmentForm(){
        //this.fileName = this.candidateName+"_"+this.candidateId;
        console.log(this.fileName);
         console.log("hit");
        
         this.candidateService.downloadEnrollmentForm(this.fileName).subscribe(
         response => {
            var blob = new Blob([response],{type:'application/pdf'});
            var fileURL = URL.createObjectURL(blob);
            window.open(fileURL);
         },
         err => {
                //console.log(err);
         },
        () => { 
            //console.log(this.id);
            this.showloader = false;
        }
        );;
    }

}