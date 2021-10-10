import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'https://perfor-tracker-hackx.herokuapp.com/api/v1/'
  loggedInUser:any = {};
  constructor(private _http: HttpClient) { }

  
  login(data: any) : Observable<any> {
      let url = this.url+"users/login";
     return  this._http.post(url, data).pipe( tap(d=> {this.loggedInUser = d}));
  }

  isAdmin(){
    return this.loggedInUser.user.isAdmin || false;
  }

  isAuthorized(){
    return this.loggedInUser.token? true:false; 
  }

  getToken(){
    return this.loggedInUser.token || false;
  }
}
