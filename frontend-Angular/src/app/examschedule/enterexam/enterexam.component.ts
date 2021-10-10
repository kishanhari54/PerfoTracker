import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-enterexam',
  templateUrl: './enterexam.component.html',
  styleUrls: ['./enterexam.component.scss']
})
export class EnterexamComponent implements OnInit {

  constructor(private _common: CommonService,private _router:ActivatedRoute , private _route:Router) { }
  formSubmitted = false;
  id;  data:any;
  ngOnInit(): void {

    this.id  = this._router.snapshot.paramMap.get('id')
    if (this.id !=0) {
      this.fetchExamData(this.id);
    }else {
      this.data = new exam();
    }
  }
  ngAfterViewInit(){
 
  }
  fetchExamData(id){
    this._common.getExams(this.id).subscribe( d=> {
      this.data = d
    })
  }
  updateData(){
    this._common.updateExam(this.data,this.id).subscribe( d=> {
      this._common.openSnackBar('Updated Successfully','')
      this._route.navigate(['/dashboard']);
    },(err)=>{
      this._common.openSnackBar('Error on Update ','')
    }
    )
  }
  addExam(examForm:any){


      this.formSubmitted = true;

      if (examForm.valid){
     
        if (this.id !=0) {
      this.updateData();
        }else {  
      this._common.createExam(this.data).subscribe( d=> {
        this._common.openSnackBar('Created Successfully','');
        this._route.navigate(['dashboard']);
      }, (er)=> {
        this._common.openSnackBar('Error on Creation','');
      })
    }
    }
    }
}


export class exam {
  constructor(){
  }

  semester:String | undefined ;
  year:string ;
  dateOfExam = new Date();
  time:string | undefined
  subject:String | undefined;
  department:String | undefined;
}
