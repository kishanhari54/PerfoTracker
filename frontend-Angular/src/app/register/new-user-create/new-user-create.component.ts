import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';
import { exam } from 'src/app/examschedule/enterexam/enterexam.component';

@Component({
  selector: 'app-new-user-create',
  templateUrl: './new-user-create.component.html',
  styleUrls: ['./new-user-create.component.scss']
})
export class NewUserCreateComponent implements OnInit {

  constructor(private _common: CommonService,private _router:ActivatedRoute , private _route:Router) { }
  formSubmitted = false;
  id;  data:any;
  ngOnInit(): void {

    this.id  = this._router.snapshot.paramMap.get('id')
    if (this.id !=0) {
      this.fetchUserData(this.id);
    }else {
      this.data = new user();
    }
  }
  ngAfterViewInit(){
 
  }
  fetchUserData(id){
    this._common.getUsers(this.id).subscribe( d=> {
      this.data = d
    })
  }
  updateData(){
    this._common.updateUser(this.data,this.id).subscribe( d=> {
      this._common.openSnackBar('Updated Successfully','')
      this._route.navigate(['/dashboard']);
    },(err)=>{
      this._common.openSnackBar('Error on Update ','')
    }
    )
  }
  addUser(userForm:any){


      this.formSubmitted = true;

      if (userForm.valid){
     
        if (this.id !=0) {
      this.updateData();
        }else {  
      this._common.registerUser(this.data).subscribe( d=> {
        this._common.openSnackBar('Created Successfully','');
        this._route.navigate(['dashboard']);
      }, (er)=> {
        this._common.openSnackBar('Error on Creation','');
      })
    }
    }
    }
}


export class user {
  constructor(){
  }

  email:String ;
  password:string ;
  joiningDate: string ;
  department:string 
  currentYear:String ;
  currentSemester:String;
  regNo:string;
  phoneNumber:string
}