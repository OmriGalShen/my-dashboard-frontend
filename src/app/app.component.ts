import { Component, HostListener } from '@angular/core';
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

  @HostListener('window:beforeunload', ['$event']) // logout when exiting page
  unloadHandler(event) {
    this.sendLogout();
  }

  constructor(private router: Router, private authService: AuthService) {
    this.authService.userObervable.subscribe(
      (user) => (this.currentUser = user)
    ); // update local variable
  }

  clickLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  sendLogout() {
    if (this.currentUser) this.authService.logout();
  }
}
