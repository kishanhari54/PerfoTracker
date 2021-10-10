import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import {CommonService} from '../common.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credential:any = {};
  load = false;
  constructor(private _login:LoginService,private _CommonService:CommonService , private _router:Router) { }

  ngOnInit(): void {
    
    this.credential = {email: 'kishanhari', password:'password'}
  }

  login(form:any){
    this.load = true;
      this._login.login(this.credential).subscribe(d=> 
        {
          this.load = false;
            this._CommonService.openSnackBar('Login Successful','');
            this._router.navigate(['dashboard']);
        } , (err) => {
          this.load = false;
          this._CommonService.openSnackBar('Login Error : ' + JSON.stringify(err.error),'')
        } )
  }

}
