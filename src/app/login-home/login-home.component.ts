import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css'],
})
export class LoginHomeComponent implements OnInit {
  currentUser: any;
  
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) { 
    // redirect to login if not logged in
    if (!this.authService.currentUserValue) { 
      this.router.navigate(['login']);
    }
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    console.log(this.authService.currentUser);
    console.log(this.authService.currentUserSubject);
    console.log(this.authService.currentUserValue);
  }

  logout() {
    this.authService.logout();
  }
}
