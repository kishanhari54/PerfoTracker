import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonService } from './common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy,OnInit
{
  title = 'perfo-track';
  load = false;
  unsubsribe = new Subject();
  constructor( private _common:CommonService){

  
  }
ngOnInit(){
  
}
ngAfterViewInit(){
  //this._common.requestOn.pipe( takeUntil(this.unsubsribe)).subscribe( (d:any) => this.load = d)
}
  ngOnDestroy(){
    this.unsubsribe.next();
    this.unsubsribe.complete();
}
}
