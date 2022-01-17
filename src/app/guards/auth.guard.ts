import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.userObservable.subscribe((user) => {
      if (user) this.isLoggedIn = true;
      else this.isLoggedIn = false;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isLoggedIn) {
      return true;
    }
    // navigate to login page as user is not authenticated
    this.router.navigate(['/login']);
    return false;
  }
}
