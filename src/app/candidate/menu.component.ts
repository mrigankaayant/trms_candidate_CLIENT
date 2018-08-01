import { Component, OnInit, ViewChild } from '@angular/core';
import{CandidateService} from './candidate.service';
import { SelectItem, Message, LazyLoadEvent, TabViewModule, SplitButtonModule, MenuItem,TabMenuModule } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';
import { UserMst } from '../model/user.mst.model';

@Component({

	selector: 'menu',
	templateUrl: 'app/candidate/menu.html'
})
export class MenuComponent implements OnInit {
/*
	items: MenuItem[];

	ngOnInit() {}

	constructor(private router: Router) {	}
       
	searchFrom(){
		this.router.navigate(['recruitment/searchCandidate']);
	}

	newCandidateFrom(){
		this.router.navigate(['recruitment/newCandidate']);
	}

	freepoolCandidateFrom(){
		this.router.navigate(['recruitment/freepoolcandidate']);
	}

	addCandidateFrom(){
		this.router.navigate(['recruitment/addCandidate']);
	}

	callHistoryFrom(){
        this.router.navigate(['recruitment/callHistory']);
	}   

	*/



items: MenuItem[];
activeItem: MenuItem;
userMst:UserMst;
candidateId:string;

constructor(private candidateService:CandidateService) {
	  
	}

ngOnInit() {
//let id = this.route.snapshot.params["id"];
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
			this.items = [
            {label: 'Registration', icon: 'fa fa-plus',routerLink: ['/candidate/registration']},
            {label: 'Enrollment Form', icon: 'fa-list',routerLink: ['/candidate/enrollment/'+this.candidateId]},
			{label: 'Payment', icon: 'fa-list',routerLink: ['/candidate/viewpaymentdetails/']},
            {label: 'Traning', icon: 'fa-users',routerLink: ['/yyy']},
            {label: 'Resume', icon: 'fa-history',routerLink: ['/xx']},
            {label: 'Documents', icon: 'fa-search',routerLink: ['/xx']},
			{label: 'Videos',icon: 'fa-inr',routerLink: ['/xx']},
			{label: 'Log Out',icon: 'fa-sign-out',routerLink: ['/candidate/logout']}
        ];
		

		}
  );
		}
  )
}	

}


