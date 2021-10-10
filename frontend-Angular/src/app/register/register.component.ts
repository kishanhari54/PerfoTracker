import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _common: CommonService , public _login:LoginService,private _route:Router) { }
  displayedColumns: string[] = ['Name', 'Department', 'Year', 'Date Of Joining','Registration Number'];
  dataSource = [];
  isAdmin = false;

  ngOnInit(): void {
    this.isAdmin = this._login.isAdmin();
    if(this.isAdmin) {
      this.displayedColumns.push('Modify');
    }
  
  }

  ngAfterViewInit(){
    this.getUsers();
  }

  addNew(){
    //this._route.navigate(['dashboard','newevent'],{relativeTo:this.activatedRoute})
    this._route.navigateByUrl('dashboard/newUser/0')
  }
  edit(regNo){
    this._route.navigateByUrl('dashboard/newUser/'+regNo);
  }
  delete(regNo: string){
    this._common.requestOn.next(true);
    this._common.deleteUser(regNo).subscribe(
      d=> {
        debugger;
        this.getUsers();
         this._common.openSnackBar('Deleted Successfuly','Deleted');
      }, (err)=> {
        this._common.openSnackBar('Error on deleting User','Error');
      })
    
  }
  getUsers(){
    this._common.getUsers().subscribe( d=> {
      this.dataSource = d;
    }, (err)=> {
        this._common.openSnackBar('Error Fetching Data','')
    })
  }

}
