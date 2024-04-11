import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  username_validation_msg: string = "";
  password_validation_msg: string = "";
  loginErrorMessage: string = "";

  validation_messages = {
    'username' : [
      { type : 'required', message : 'Username is required' },
      { type : 'minlength', message : 'Username must be at least 6 characters long'},
      { type : 'maxlength', message : 'Username cannot be more than 15 characters long'}
    ],
    'password' : [
      { type : 'required', message : 'Password is required' },
      { type : 'minlength', message : 'Password must be at least 6 characters long' },
      { type : 'maxlength', message : 'Password cannot be more than 30 characters long' },
      { type : 'pattern', message : 'Please enter a valid password' }
    ]
  }

  constructor(
    private authService: AuthenticationService, 
    private formBuilder: FormBuilder,
    private router: Router,
  ) { 
    // redirect to home if already logged in
    if (this.authService.currentUserValue) { 
      this.router.navigate(['loginHome']);
    }
  }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.pattern(/^[a-zA-Z\d#@!~%^&*]{6,30}$/),
        Validators.minLength(6),
        Validators.maxLength(30),
        Validators.required
      ]))
    });
  }

  login() {
    console.log('trigger');
    this.validateForm();

    if(this.loginForm.valid) {
      this.authService.authenticate(
        this.loginForm.get('username').value,
        this.loginForm.get('password').value
      ).subscribe(response => {
        console.log('login | response : ' + response);
        this.router.navigate(['loginHome']);
        //this.invalidLogin = false;
        this.loginErrorMessage = "";
      },
      error => {
        let bodyObj = JSON.parse(error._body);
        this.loginErrorMessage = bodyObj.message;
      });
    }
  }

  validateForm() {
    this.username_validation_msg = "";
    this.password_validation_msg = "";
    //username
    this.validation_messages.username.forEach(validation => {
      if(this.loginForm.get('username').hasError(validation.type)) {
        this.username_validation_msg = validation.message;
      }
    });
    //password
    this.validation_messages.password.forEach(validation => {
      if(this.loginForm.get('password').hasError(validation.type)) {
        this.password_validation_msg = validation.message;
      }
    });
  }

}
