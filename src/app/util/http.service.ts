

import { Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers,ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard.service';

import { NavigationExtras } from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class HttpService {
    private baseUrl: string;
    constructor(private http: Http, private router: Router, private authGuard: AuthGuard) {
        this.baseUrl = 'http://localhost:8080/trmsSOA';
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.request(this.baseUrl + url, this.getRequestOptionArgs(options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(this.baseUrl + url, this.getRequestOptionArgs(options));
    }

    post(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.post(this.baseUrl + url, body, this.getRequestOptionArgs(options))
    }

    postForFileUpload(url: string, body?: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.post(this.baseUrl + url, body, this.getRequestOptionArgsForFileUpload(options))
    }

    getForFileDownload(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.get(this.baseUrl + url, this.getRequestOptionArgsForFileDownload(options))
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.put(this.baseUrl + url, body, this.getRequestOptionArgs(options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.http.delete(this.baseUrl + url, this.getRequestOptionArgs(options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {

        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }

        let token: any = JSON.parse(sessionStorage.getItem('token'));
        if (token && token.access_token) {
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Authorization', 'Bearer ' + token.access_token);
            return options;
        }

        let navigationExtras: NavigationExtras = {};
        this.router.navigate(['/login'], navigationExtras);
    }

     getRequestOptionArgsForFileUpload(options?: RequestOptionsArgs): RequestOptionsArgs {

        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
            
        }
        
        let token: any = JSON.parse(sessionStorage.getItem('token'));
        if (token && token.access_token) {
           
            options.headers.append('Authorization', 'Bearer ' + token.access_token);
            return options;
        }

        let navigationExtras: NavigationExtras = {};
        this.router.navigate(['/login'], navigationExtras);
    }

    getRequestOptionArgsForFileDownload(options?: RequestOptionsArgs): RequestOptionsArgs {

         if (options == null) {
            options = new RequestOptions();
            options.responseType = ResponseContentType.ArrayBuffer;
           
        }
        if (options.headers == null) {
            options.headers = new Headers();
            
        }

        let token: any = JSON.parse(sessionStorage.getItem('token'));
        if (token && token.access_token) {
            options.headers.append('Content-Type', 'application/x-www-form-urlencoded');
            options.headers.append('Authorization', 'Bearer ' + token.access_token);
           
            return options;
        }

        let navigationExtras: NavigationExtras = {};
        this.router.navigate(['/login'], navigationExtras);
    }
}