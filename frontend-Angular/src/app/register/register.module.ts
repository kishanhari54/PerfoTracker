import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { NewUserCreateComponent } from './new-user-create/new-user-create.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';

import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ {
  path:'', component: RegisterComponent
} 
];

@NgModule({
  declarations: [
    RegisterComponent,
  //  NewUserCreateComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes),
    MatInputModule,MatDatepickerModule,MatNativeDateModule ,MatTableModule,FormsModule
    ,MatDividerModule,MatButtonModule,MatIconModule,
  ]
})
export class RegisterModule { }
