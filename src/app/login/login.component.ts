import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginshow: boolean = true
  loginForm: FormGroup
  signupForm: FormGroup
  user: User
  signedUp:boolean

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
  }

  // login
  login(): void {
debugger
    this.userService.login(this.loginForm.value)
      .subscribe((data) => {
        this.user=data
        console.log('user ',this.user)
        localStorage.setItem('currentUser', JSON.stringify(this.user._id));
        this.router.navigate(["/dashboard"]);
      },
        err => {
          console.log('Something went wrong!');
        });
  }


  // sign up
  signup(): void {
    this.userService.signUp(this.signupForm.value)
    .subscribe(userdata => {

      console.log('userdata',userdata)
      if(userdata){
      this.signedUp=true
      this.loginshow=true
      }
      else
      {
        // pop up something went wrong.
      }

    },err=>{
      console.log('Something went wrong!');}
      );
  } //signUp ends

  // ngOnInit
  ngOnInit() {
    // updateOn default is change other option is blur or submit
    this.signupForm = this.fb.group({
      signupName: ['', { updateOn: 'blur' }, Validators.required],
      signupEmail: ['', { updateOn: 'blur' }, Validators.required],
      signupPassword: ['', { updateOn: 'blur' }, Validators.required],
      signupconfirmPassword: ['', { updateOn: 'blur' }, Validators.required]
    });
    // https://stackblitz.com/angular/bxvldvkjeav?file=src%2Fapp%2Freactive%2Fhero-form-reactive.component.ts

    this.loginForm = this.fb.group({
      email: ['', { updateOn: 'blur' }, Validators.required],
      password: ['', { updateOn: 'blur' }, Validators.required]
    });
  }

  // login :: validation check
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  // signup :: validation check
  get signupNameVal() { return this.signupForm.get('signupName'); }
  get signupemailVal() { return this.signupForm.get('signupEmail'); }
  get signuppasswordVal() { return this.signupForm.get('signupPassword'); }
  get signupconfirmPasswordVal() { return this.signupForm.get('signupconfirmPassword'); }
}
