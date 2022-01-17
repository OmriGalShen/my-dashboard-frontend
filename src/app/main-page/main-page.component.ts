import { Component, OnDestroy, OnInit } from '@angular/core';
import { first, interval, Subscription } from 'rxjs';
import { ClientDetails, OnlineClient, User } from '../models/API_Classes';
import { AuthService } from '../services/auth.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, OnDestroy {
  loading = false;
  currentUser: User;
  onlineClients: OnlineClient[];
  clientDetails: ClientDetails;
  displayClientDetails = false;
  updateSubscription: Subscription;
  displayedColumns: string[] = [
    'username',
    'loginTime',
    'lastUpdated',
    'ip',
    'details',
  ];

  constructor(
    private authService: AuthService,
    private clientService: ClientService
  ) {
    this.currentUser = this.authService.currentUserValue;
  }

  private fetchOnlineClient() {
    this.clientService.getOnlineClients().subscribe((clients) => {
      this.loading = false;
      this.onlineClients = clients;
      this.onlineClients.forEach((c) => {
        c.loginTime = new Date(c.loginTime);
        c.lastUpdated = new Date(c.lastUpdated);
      });
    });
  }

  ngOnInit() {
    this.loading = true;
    this.fetchOnlineClient(); // inital fetch
    this.updateSubscription = interval(3000).subscribe((data) =>
      this.fetchOnlineClient()
    ); // update every 3 seconds
  }

  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
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
