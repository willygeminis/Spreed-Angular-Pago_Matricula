import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard {

  constructor(private authservis:AuthService, private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authservis.isAuthenticated) {
      let requiredRoles = route.data['role'];
      let userroles = this.authservis.roles;
      for (let role of userroles) {
        if(requiredRoles.includes(role)){
          return true;
        };
      }
    }
      return false
  }
}
