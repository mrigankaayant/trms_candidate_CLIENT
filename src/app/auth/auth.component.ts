import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from './auth.service';
import { Message } from 'primeng/primeng';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: '/app/auth/login.html',
  styleUrls: ['./app/auth/login.css']
})
export class AuthComponent {
  message: string;
   msgs: Message[] = [];
  loginForm: FormGroup;
  

  constructor(private authService: AuthService, public router:
    Router, private formBuilder: FormBuilder) {
    this.setMessage();
  }

  ngOnInit() {
    
    this.loginForm = this.formBuilder.group({
      'username': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
    })
  }


  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(credential: any) {
    this.authService.login(credential.username, credential.password)
    .subscribe((data) => {
        sessionStorage.setItem('token', JSON.stringify(data));
        //sessionStorage.setItem('AccessToken', JSON.stringify(data.access_token));

        let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '';
        if(redirect == 'login'){
            redirect="";
        }
        let navigationExtras: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: true
        };
      this.router.navigate([redirect], navigationExtras);
      },
      
      (error)=>{
        this.loginForm.reset();
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Error ', detail: 'Please Enter Correct Username or Password ' });
      }
      
      );
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
