import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamscheduleComponent } from './examschedule.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { EnterexamComponent } from './enterexam/enterexam.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';



const routes: Routes = [ {
  path:'', component: ExamscheduleComponent
} 
];
@NgModule({
  declarations: [
    ExamscheduleComponent,
   // EnterexamComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    FormsModule
    ,MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ]
})
export class ExamscheduleModule { }
