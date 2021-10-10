import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-examschedule',
  templateUrl: './examschedule.component.html',
  styleUrls: ['./examschedule.component.scss']
})
export class ExamscheduleComponent implements OnInit {

  constructor(private _common: CommonService , public _login:LoginService,private _route:Router) { }
  displayedColumns: string[] = ['Year', 'Department', 'Subject', 'Date Of Exam','Time'];
  dataSource = [];
  isAdmin = false;

  ngOnInit(): void {
    this.isAdmin = this._login.isAdmin();
    if(this.isAdmin) {
      this.displayedColumns.push('Modify');
    }
  
  }

  ngAfterViewInit(){
    this.getExams();
  }

  addNew(){
    //this._route.navigate(['dashboard','newevent'],{relativeTo:this.activatedRoute})
    this._route.navigateByUrl('dashboard/newExam/0')
  }
  edit(id){
    this._route.navigateByUrl('dashboard/newExam/'+id);
  }
  delete(id: string){
    this._common.requestOn.next(true);
    this._common.deleteExam(id).subscribe(
      d=> {
        this.getExams();
        this._common.requestOn.next(false);
         this._common.openSnackBar('Deleted Successfuly','Deleted');
      }, (err)=> {
        this._common.openSnackBar('Error on deleting Event','Error');
        this._common.requestOn.next(false);
      })
    
  }
  getExams(){
    this._common.getExams().subscribe( d=> {
      this.dataSource = d;
    }, (err)=> {
        this._common.openSnackBar('Error Fetching Data','')
    })
  }

}
