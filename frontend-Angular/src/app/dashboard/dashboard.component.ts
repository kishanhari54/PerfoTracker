import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  links = [{desc:'View Exam Schedule',route:'examschedule'},
  {desc:'View Events',route:'events'}]

  constructor(private _route:Router ,public _login:LoginService, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this._login.isAdmin()){
      this.links.push({ desc:'Add New User',route:'userlist'})
    }
  }


  navigate(link:any){
      this._route.navigate(link,{relativeTo: this._activatedRoute})
  }
}
