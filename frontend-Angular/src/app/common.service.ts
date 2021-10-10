import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private _snackBar: MatSnackBar,private _http:HttpClient,private login:LoginService) { }
  requestOn = new Subject();

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
  url = 'https://perfor-tracker-hackx.herokuapp.com/api/v1/'
  //url = 'localhost:80/api/v1/'
  getExams(id?): Observable<any> {
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "exams";
    if(!this.login.isAdmin()) {  url += `/${this.login.loggedInUser.user.regNo}` }
    if (id) url+= "/getById/"+id;
  return  this._http.get(url,{ headers:headers})
  }

  createExam(data:any) : Observable<any>{
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "exams";
  return  this._http.post(url,data,{ headers:headers})
  }
  
  updateExam(data: any,id: string) :Observable<any> {
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "exams/"+id;
  return  this._http.put(url,data,{ headers:headers})
  }

  deleteExam(id: string):Observable<any>{
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "exams/"+id
  return  this._http.delete(url,{ headers:headers})
  }

  getEvents(id?) :Observable<any> {
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "events";
    if (id) url+= "/"+id;
  return  this._http.get(url,{ headers:headers})
  }

  createEvents(data: any) :Observable<any> {
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "events";
  return  this._http.post(url,data,{ headers:headers})
  }

  updateEvents(data: any,id: string) :Observable<any> {
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "events/"+id;
  return  this._http.put(url,data,{ headers:headers})
  }

  deleteEvents(id: string):Observable<any>{
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "events/"+id
  return  this._http.delete(url,{ headers:headers})
  }

  getUsers(id?): Observable<any> {
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "users";
    //if(!this.login.isAdmin()) {  url += `/${this.login.loggedInUser.user.regNo}` }
    if (id) url+= "/"+id;
  return  this._http.get(url,{ headers:headers})
  }

  registerUser(data):Observable<any>{
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "users/register";
    return  this._http.post(url,data,{ headers:headers})
  }
  updateUser(data: any,regNo: string) :Observable<any> {
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "users/"+regNo;
  return  this._http.put(url,data,{ headers:headers})
  }
  deleteUser(regId: string):Observable<any>{
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*','content-type': 'application/json','Authorization':`Bearer ${this.login.getToken()}`}  )
    let url = this.url + "users/"+regId
  return  this._http.delete(url,{ headers:headers})
  }
}
