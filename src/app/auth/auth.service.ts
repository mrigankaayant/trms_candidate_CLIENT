import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  redirectUrl: string;
  headers: Headers;
  isLoggedIn: boolean = false;

  constructor(private http: Http) {
    console.log("auth service object created.");
    this.headers = new Headers();
    this.headers.append('Authorization', 'Basic bXktdHJ1c3RlZC1jbGllbnQ6c2VjcmV0');

  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8080/trmsSOA/oauth/token?grant_type=password&username=' + username
      + '&password=' + password,
      null, { headers: this.headers })
      .map(resp => {
        return resp.json();
      });
  } 
  
  logout(): void {
       // logout code here
  }
}
