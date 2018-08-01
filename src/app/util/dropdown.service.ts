import { Injectable, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../util/http.service'
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { CandidateCourse } from '../model/candidate.course.model'
import { CandidateRemarks } from '../model/candidate.remarks.model'
import { CandidateVisa } from '../model/candidate.visa.model'

import { PayType } from '../model/pay.type.model'

import { GradingSystem } from '../model/gradingSystem.model'
import { Specialization } from '../model/specialization.model'
import { EmploymentTypes } from '../model/employmenttype.model'
import { WorkAuthorization } from '../model/workauthorization.model'



@Injectable()
export class DropdownService implements OnInit {
    
    public recruitmentStatus: any[];
    public candidateService: any[];
    public candidateSkill: any[];
    public candidatePayType: any[];
    public candidateVisa: any[];
    public recrSource: any[];
    public candidateEducation: any[];
    public piorities: any[];
    public statuses: any[];
    public userTypeList: any[]
    public departmentList:any[]
    public taskGroupList:any[]
    public taskList:any[]
    public skills: any[];
    public recruitmentServiceList:any[];
    public gradingSystem:any[];
    public specialization:any[];
    public workAuthorization:any[];
    public employmentTypes:any[];

    private baseUrl: string;


    ngOnInit() {

    }

    constructor(private http: HttpService,private _http: Http) {
         this.baseUrl = 'http://localhost:8080/trmsSOA';
         
        this.skills = [];
        this.skills.push({ label: 'Select Skill', value: "" });
        this.getCandidateSkill().subscribe(
            (data) => {
                for (let e of data) {
                   
                    this.skills.push({ label: e.course, value: e.course });
                }
            });

        this.recruitmentStatus = [];
        this.recruitmentStatus.push({ label: 'Select Recruitment Status', value: "" });
        this.getRecruitmentStatus().subscribe(
            (data) => {
                for (let e of data) {
                    this.recruitmentStatus.push({ label: e.statusType, value: e.statusType });
                }
            });

        this.candidateVisa = [];
        this.candidateVisa.push({ label: 'Select Visa', value: "" });
        this.getCandidateVisa().subscribe(
            (data) => {
                for (let e of data) {
                    this.candidateVisa.push({ label: e.name, value: e.name });
                }
            });    

    
       

        this.candidatePayType = [];
        this.candidatePayType.push({ label: 'Select Pay Type', value: "" });
        this.getPayType().subscribe(
            (data) => {
                for (let e of data) {
                    this.candidatePayType.push({ label: e.type, value: e.type });
                }
            });     
        
        

        this.gradingSystem = [];
        this.gradingSystem.push({ label: 'Select Grading System', value: "" });
        this.getGradingSystemService().subscribe(
            (data) => {
                for (let e of data) {
                    this.gradingSystem.push({ label: e.name, value: e.name });
                }
            });

        this.specialization = [];
        this.specialization.push({ label: 'Select Specilazation', value: "" });
        this.getSpecilizationList().subscribe(
            (data) => {
                for (let e of data) {
                    this.specialization.push({ label: e.name, value: e.name });
                }
            });

        
        this.workAuthorization = [];
        this.workAuthorization.push({ label: 'Select Work Authorization', value: "" });
        this.getWorkAuthorizationList().subscribe(
            (data) => {
                for (let e of data) {
                    this.workAuthorization.push({ label: e.name, value: e.name });
                }
            });

        this.employmentTypes = [];
        this.employmentTypes.push({ label: 'Select EmploymentTypes', value: "" });
        this.getEmploymentTypesList().subscribe(
            (data) => {
                for (let e of data) {
                    this.employmentTypes.push({ label: e.name, value: e.name });
                }
            });
        
    }

    

    private getCandidateSkill(): Observable<CandidateCourse[]> {
        return this.http.get('/courses').map(response => response.json());

    }
    private getRecruitmentStatus(): Observable<CandidateRemarks[]> {
        return this.http.get('/remarks').map(response => response.json());
    }

      private getCandidateVisa(): Observable<CandidateVisa[]> {
        return this.http.get('/visas').map(response => response.json());

    }

     

     private getPayType(): Observable<PayType[]> {
        return this.http.get('/paytypes').map(response => response.json());

    }

    

    private getGradingSystemService(): Observable<GradingSystem[]> {
        return this.http.get('/gradingsystems').map(response => response.json());

    }

    private getSpecilizationList(): Observable<Specialization[]> {
        return this.http.get('/specializations').map(response => response.json());

    }

    private getWorkAuthorizationList(): Observable<WorkAuthorization[]> {
        return this.http.get('/workAuthorizations').map(response => response.json());

    }

    private getEmploymentTypesList(): Observable<EmploymentTypes[]> {
        return this.http.get('/employmentTypes').map(response => response.json());

    }

   
}