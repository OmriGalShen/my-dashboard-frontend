import { Component, OnInit } from '@angular/core';
import { first, interval, Subscription } from 'rxjs';
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
  displayClientDetails = false;
  updateSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private clientService: ClientService
  ) {
    this.authService.userObervable.subscribe((user) => (this.currentUser = user)); // update local variable
  }

  private fetchOnlineClient() {
    this.clientService
      .getOnlineClients()
      .subscribe((clients: OnlineClient[]) => {
        this.loading = false;
        this.onlineClients = clients;
        this.onlineClients.forEach((c) => {
          c.loginTime = new Date(c.loginTime); //convert Date format
          c.lastUpdated = new Date(c.lastUpdated); //convert Date format
        });
      });
  }

  ngOnInit() {
    this.loading = true;
    this.fetchOnlineClient(); // inital fetch
    this.updateSubscription = interval(3000).subscribe((_) =>
      this.fetchOnlineClient()
    ); // update every 3 seconds
  }

  displayDetails(client: OnlineClient): void {
    this.clientService
      .getClientDetails(client.username)
      .pipe(first())
      .subscribe((details) => {
        this.clientDetails = details;
        this.clientDetails.registerTime = new Date(
          this.clientDetails.registerTime
        );
        this.displayClientDetails = true;
        console.log(details);
      });
  }
}
