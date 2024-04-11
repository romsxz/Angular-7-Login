import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx"
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {

  private HTTPservice: string = (!window.location.origin) ? window.location.protocol + '//' + window.location.hostname + (window.location.port ? (':' + window.location.port) : '') : window.location.origin;
  //private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset="utf-8"' }); // serialize format: param1=value1&param2=value2
  private headers = new Headers({ 'Content-Type': 'application/json' });
  
  constructor(private http: Http) { }

  postData(param: string, data: any) {
    // Testers
    //return this.http.post( "https://gurujsonrpc.appspot.com/guru", JSON.stringify( data ) ) // Online POST check data
    //return this.http.post( this.HTTPservice + param, JSON.stringify( data ) )
    //return this.http.post( 'http://172.16.105.108:18080/login.php', "loginName=json&password=json2", {headers: this.headers} )
    //return this.http.post( 'http://mockbin.org/request/echo', "loginName=json", {headers: this.headers} ) // Online POST check headers

    //console.log('this.HTTPservice : ', this.HTTPservice);
    console.log('param : ', param);
    console.log('data : ', data);
    let result = this.http.post(param, data, { headers : this.headers })
    .map(response => {
        /*if (response.json().result.status) {
          if (response.json().result.status == "ERROR") {
            /*if (response.json().result.code != "ERROR_NO_USER_IN_SESSION") {
              if (!this.checkIfMaint()) {
                return response.json();
              }
            }
            else if ("ERROR_NO_USER_IN_SESSION" == response.json().result.code && "unknown" != this.userObject.getValue().userName) {
              this.hideLoading();
              this.showingMsg({
                "visible":true,
                "message":response.json().result.message, 
                "type":"ERROR", "func": ()=>{
                  this.showingMsg({"visible":false,"message":"","type":""});
                  this.navigatePage('/' + this.activeLanguage + '/index.php');
                  window.location.href = this.getOriginWithHashTag() + this.activeLanguage + '/index.php';
                }
              });
            }
            else {
              return response.json();
            }
            return response.json();
          }
          else {
            return response.json();
          }
          return response.json();
        }
        else {
          return response.json();
        }*/
        return response.json();
      }).catch((err) => {
          //this.showingMsg({"visible":true,"message":"Connection Error","type":"ERROR"})
          //alert("Connection Error !!");
          return Observable.throw(err)
      });
      return result;
  }

}
