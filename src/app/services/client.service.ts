import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ClientDetails,
  OnlineClient,
  RegisterClient,
} from '../models/API_Classes';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getOnlineClients() {
    return this.http.get<OnlineClient[]>(
      `${environment.API_URL}/online-clients`
    );
  }

  getClientDetails(username: string) {
    return this.http.get<ClientDetails>(
      `${environment.API_URL}/client-details/${username}`
    );
  }

  registerClient(client: RegisterClient) {
    return this.http
      .post<any>(`${environment.API_URL}/register-client`, client);
  }
}
