import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './logged-in.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [ 
  {path:'dashboard' , loadChildren: () =>  import(`./dashboard/dashboard.module`).then(m => m.DashboardModule) , 
  canLoad: [LoggedInGuard]},
  {
  path:'login', component: LoginComponent
} , {path:'',pathMatch:'full',redirectTo:'login'},
{path:'**',pathMatch:'full',redirectTo:'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
