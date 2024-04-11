import { Injectable } from '@angular/core';
import { DataService } from '../helper/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class AuthenticationService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private router: Router, 
    private http: Http, 
    private dataService: DataService
  ) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  authenticate(username: string, password: string) {
    let result = this.http.post("https://dummyjson.com/auth/login",
      {
        username: username,
        password: password,
        expiresInMins: 30, // optional, defaults to 60
      })
    .map(response => {
        const auth = response.json();
        localStorage.setItem('currentUser', JSON.stringify(auth));
        this.currentUserSubject.next(auth);
        return auth;
      }).catch((err) => {
          //alert("Connection Error !!");
          return Observable.throw(err)
      });
      return result;
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
