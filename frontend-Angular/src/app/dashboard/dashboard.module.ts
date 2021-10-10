import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes,ActivatedRoute,ActivatedRouteSnapshot } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { EventsComponent } from './events/events.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NewEventComponent } from './events/new-event/new-event.component';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { EnterexamComponent } from '../examschedule/enterexam/enterexam.component';
import {MatDatepickerModule  } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NewUserCreateComponent } from '../register/new-user-create/new-user-create.component';


const routes: Routes = [ {
  path:'', component: DashboardComponent, 
  children:[
    {path:'examschedule' , loadChildren: () =>  import(`../examschedule/examschedule.module`).then(m => m.ExamscheduleModule)},
    {path:'userlist' , loadChildren: () =>  import(`../register/register.module`).then(m => m.RegisterModule)},
    {path:'newExam/:id' , component: EnterexamComponent}
    ,{path:'events' , component:EventsComponent }
    ,{path:'newevent/:id' , component:NewEventComponent },
    {
      path:'newUser/:id',component: NewUserCreateComponent
    }
    ,{path:'' , pathMatch:'full',redirectTo:'events' }
  ]
} 
,    

];

@NgModule({
  declarations: [
    DashboardComponent,
    EventsComponent,
    EnterexamComponent,
    NewUserCreateComponent
  ],
  imports: [
    CommonModule,MatInputModule,MatDatepickerModule,MatNativeDateModule ,
    MatSidenavModule,MatCardModule,MatProgressBarModule,MatDividerModule,MatButtonModule,MatIconModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class DashboardModule { }
