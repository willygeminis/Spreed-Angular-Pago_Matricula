import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard {

  constructor(private authservis:AuthService, private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authservis.isAuthenticated) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
