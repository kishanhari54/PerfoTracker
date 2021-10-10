import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  constructor(private _common:CommonService,public  _login:LoginService, private _route:Router , private activatedRoute:ActivatedRoute) { }
  events:any = [];
  ngOnInit(): void {
     
  }
  ngAfterViewInit(){
    this.getEvents();
  }
  addNew(){
    //this._route.navigate(['dashboard','newevent'],{relativeTo:this.activatedRoute})
    this._route.navigateByUrl('/dashboard/newevent/0')
  }
  edit(id){
    this._route.navigateByUrl('/dashboard/newevent/'+id);
  }
  delete(id: string){
    this._common.requestOn.next(true);
    this._common.deleteEvents(id).subscribe(
      d=> {
        this.getEvents();
        this._common.requestOn.next(false);
         this._common.openSnackBar('Deleted Successfuly','Deleted');
      }, (err)=> {
        this._common.openSnackBar('Error on deleting Event','Error');
        this._common.requestOn.next(false);
      })
    
  }
  getEvents(){
    this._common.requestOn.next(true);
    this._common.getEvents().subscribe( d=> {
      this.events = d;
      this._common.requestOn.next(false);
    }, (err)=> {
      this._common.openSnackBar('Error on refreshing Events','Error');
      this._common.requestOn.next(false);
    })
  }

}
