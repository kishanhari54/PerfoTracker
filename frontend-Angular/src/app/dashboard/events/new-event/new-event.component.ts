import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  data:any;
  id ;formSubmitted = false;
  constructor(private _common:CommonService,private _router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    /* this.activatedRoute.parent.data.subscribe(data => {

    })
     */
    this.id  = this.activatedRoute.snapshot.paramMap.get('id')
    if (this.id !=0) {
      this.fetchEvent(this.id);
    }else {
      this.data = new events();
    }
      


  }

  addEvent(eventForm: any){
    this.formSubmitted = true;
    if (eventForm.valid){
     
      if (this.id !=0) {
    this.updateData();
      }else {  
    this._common.createEvents(this.data).subscribe( d=> {
      this._common.openSnackBar('Created Successfully','');
      this._router.navigate(['dashboard']);
    }, (er)=> {
      this._common.openSnackBar('Error on Creation','');
    })
  }
  }
}


fetchEvent(id){
this._common.getEvents(id).subscribe( d=> {
  this.data = d
})
}

updateData(){
  this._common.updateEvents(this.data,this.id).subscribe( d=> {
    this._common.openSnackBar('Updated Successfully','')
    this._router.navigate(['/dashboard']);
  },(err)=>{
    this._common.openSnackBar('Error on Update ','')
  }
  )
}

}


export class events {
  constructor(){
  }

  type:String  
  date = new Date();
  time:string 
  subject:String ;
  info:String ;
}