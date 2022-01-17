import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/API_Classes';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'My Dashboard';
  currentUser: User;

  doBeforeUnload() {
    return true;
  }

  doUnload() {
    if (this.currentUser) {
      this.authService.logout(this.currentUser.username).subscribe((x) => {});
    }
  }

  constructor(private router: Router, private authService: AuthService) {
    this.authService.userObservable.subscribe((x) => (this.currentUser = x));
  }

  logout() {
    if (this.currentUser) {
      this.authService.logout(this.currentUser.username).subscribe((x) => {
        this.router.navigate(['/login']);
      });
    }
  }
}
