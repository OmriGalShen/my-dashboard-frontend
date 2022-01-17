import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/API_Classes';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() title;
  @Input() sendLogout;

  currentUser: User;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.userObservable.subscribe((x) => (this.currentUser = x));
  }

  clickLogout() {
    this.sendLogout();
  }
}
