import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user.model'
import { fieldmatchValidator } from '../shared/field-match.directive';
import { Res } from '../_models/response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginshow: boolean = true
  loginForm: FormGroup
  signupForm: FormGroup
  user: Res
  signedUp:boolean
  result:string
  didnotmatch:boolean
  emailIdExists:boolean

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
  }

  // login
  login(): void {
    this.userService.login(this.loginForm.value)
      .subscribe((data) => {
        this.user=data
        if(this.user.status)
        {
        localStorage.setItem('currentUser', this.user.user._id);
        this.router.navigate(["/dashboard"]);
        }
        else
        {
          this.result=this.user.message;
          this.didnotmatch=true;
        }
      },
        err => {
          console.log('Something went wrong!');
        });
  }


  // sign up
  signup(): void {
    this.userService.signUp(this.signupForm.value)
    .subscribe(response => {
      if(response.status){
      this.signedUp=true
      this.loginshow=true
      this.result=response.message;
      }
      else
      {
        this.result=response.message;
        this.emailIdExists=true
      }

    },err=>{
      console.log('Something went wrong!');}
      );
  } //signUp ends

  // ngOnInit
  ngOnInit() {
    // updateOn default is change other option is blur or submit
    this.signupForm = this.fb.group({
      signupName: ['', Validators.required],
      signupEmail: ['',[Validators.required,Validators.email]],
      signupPassword: ['', [Validators.required,Validators.minLength(3)]],
      signupWallet: ['', [Validators.required]],
      signupmobile: ['', [Validators.required]],
      signupconfirmPassword: ['',[Validators.required,fieldmatchValidator('signupPassword')]]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.email,Validators.email]],
      password: ['', Validators.required]
    });
  }

  // login :: validation check
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  // signup :: validation check
  get signupWalletVal() { return this.signupForm.get('signupWallet'); }
  get signupNameVal() { return this.signupForm.get('signupName'); }
  get signupemailVal() { return this.signupForm.get('signupEmail'); }
  get signuppasswordVal() { return this.signupForm.get('signupPassword'); }
  get signupconfirmPasswordVal() { return this.signupForm.get('signupconfirmPassword'); }
  get signupmobileVal() { return this.signupForm.get('signupmobile'); }


  // validation for integer value only
  isInteger(event){
    if(isNaN(event.key)){
      return false    
    }
    return true
  }
}
