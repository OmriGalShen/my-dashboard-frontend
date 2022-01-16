import { Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/API_Classes';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'My Dashboard';
  currentUser: User;

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event) {
    this.sendLogout();
  }

  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }

  ngOnDestroy() {
    this.sendLogout();
  }

  clickLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  sendLogout() {
    if (this.currentUser) this.authService.logout();
  }
}
