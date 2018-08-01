import { Injectable, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs,ResponseContentType } from '@angular/http';
import { HttpService } from '../util/http.service';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RegistartionModel } from '../model/registration.candidate.model';
import { PaymentModel } from '../model/candidate.payment.model';
import {CandidateSelectedCourse} from'../model/candidate.selcted.course.model';
import {Candidate} from'../model/candidate.model';

@Injectable()
export class CandidateService {
  options: RequestOptionsArgs;

  constructor(private http: HttpService, private nativeHttp: Http) {

  }
  getUserType() { 
    return this.http.get('/findUserType').map(response => response.json());
  }

getCandidateDetailsByUserId(userId:string){
  return this.http.get('/candidate/'+userId).map(response => {return response.json()});
}

saveRegistration(registartionModel: RegistartionModel):Observable<RegistartionModel> {
        console.log("Enter Service");
        return this.http.post('/saveRegistration',registartionModel,this.options).map(response => {return response.json()});
}

getRegistrationDetails(candidateId:string){
return this.http.get('/recruiting/view/candidate/'+candidateId).map(response => {return response.json()});
}

getPaymentDetails(candidateId:string){
return this.http.get('/paymentDetails/'+candidateId).map(response => {return response.json()});
}

makePayment(paymentModel:PaymentModel){
return this.http.post('/make/payment',paymentModel,this.options).map(response => {return response.json()});
}

goToSuccess(paymentId:string,payerId:string){
  return this.http.post('/complete/payment/'+paymentId+'/'+payerId,this.options).map(response => {return response.json()});
}
getPaypalPaymentDetails(){
  return this.http.get('/paymentList').map(response => {return response.json()});
}

updateCourse(candidateSelectedCourse:CandidateSelectedCourse):Observable<Candidate>{
  console.log(candidateSelectedCourse.candidateFinalCourses);
return this.http.post('/update/candidatecourse',candidateSelectedCourse,this.options).map(response => {return response.json()});
}
getEnrollmentForm(candidateId:string){
return this.http.get('/candidate/generateEnrollment/'+candidateId).map(response => {return response.json()});
}

uploadFile(fromData:FormData,candidateId:string,candidateName:string){
   return this.http.postForFileUpload('/upload/enrollmentForm/'+candidateId+'/'+candidateName,fromData,this.options).map(response => {return response.json()}); 
}

downloadEnrollmentForm(fileName:string){
return this.http.getForFileDownload('/download/file/'+fileName).map(response => {return response.arrayBuffer()});

}

/*downloadFile(id:string): Observable<Blob> {
    let options = new RequestOptions({responseType: ResponseContentType.Blob });
    return this.http.getForFiledownload('/download/file/'+id, options).map(res => res.blob());
        
}*/
 
}


