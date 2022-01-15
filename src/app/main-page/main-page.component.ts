import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { ClientDetails, OnlineClient, User } from '../models/API_Classes';
import { AuthService } from '../services/auth.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  loading = false;
  currentUser: User;
  onlineClients: OnlineClient[];
  clientDetails: ClientDetails;

  constructor(
    private authService: AuthService,
    private clientService: ClientService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  ngOnInit() {
    this.loading = true;
    this.clientService
      .getOnlineClients()
      .pipe(first())
      .subscribe((clients) => {
        this.loading = false;
        this.onlineClients = clients;
      });
  }

  displayDetails(client: OnlineClient): void {
    this.clientService
      .getClientDetails(client.username)
      .pipe(first())
      .subscribe((details) => {
        this.clientDetails = details;
        console.log(details);
      });
  }
}
