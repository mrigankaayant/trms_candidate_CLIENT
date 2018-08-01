import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder, Validators,FormArray } from '@angular/forms';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DropdownService } from '../util/dropdown.service';
import { SelectItem, Message, LazyLoadEvent, TabViewModule,
	     SplitButtonModule, MenubarModule,MenuItem, TabMenuModule} from 'primeng/primeng';

import{CandidateService} from './candidate.service';

import { SocialMedia } from '../model/social.media.model';
import { PreferredLocation } from '../model/preferred.location.model';
import { Immigration } from '../model/candidate.imigration.model';
import { Phone } from '../model/phone.model';
import { Candidate } from '../model/candidate.model';


@Component({

	selector: 'registrationDetails',
	templateUrl: 'app/candidate/showRegistrationDetails.html',
	styleUrls: ['./app/candidate/candidate.css']
})

export class RegistrationDetails {
	
	candidate: Candidate;
    showloader:boolean;
    id:string;
	constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,
	private dropdownService: DropdownService,private router: Router,private candidateService:CandidateService) {
	  
		
	}

	ngOnInit() {
        this.showloader = true;
        this.candidate = new Candidate();
        this.candidate.preferredLocations = new Array<PreferredLocation>();
        this.candidate.visas = new Array<Immigration>();
        this.candidate.socialMedia = new SocialMedia();
        this.candidate.phones = new Array<Phone>();

        let id = this.route.snapshot.params["id"];
        this.candidateService.getRegistrationDetails(id).subscribe(
         data => {
             console.log(data);
			this.candidate = data;
            this.id = this.candidate.candidateId;  
         },
         err => {
                console.log(err);
         },
        () => { 
            this.showloader = false;
		} 
        );


    }

      goToEnrollment(){
		   this.router.navigate(['candidate/enrollment',this.id]);
        }

}