import { Injectable } from '@angular/core';
import { ActivatedRoute, CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AppGuard implements CanLoad {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.loginService.isLogin) {
      this.router.navigate([`/`], { relativeTo: this.route });
      return false;
    }
    return true;
  }
}
