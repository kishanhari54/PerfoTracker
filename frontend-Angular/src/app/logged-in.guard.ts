import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanLoad {
  constructor(private _login:LoginService,private _route:Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._login.isAuthorized()) {
      this._route.navigate(['/login'])
    }
      return this._login.isAuthorized()
      
  }
}
