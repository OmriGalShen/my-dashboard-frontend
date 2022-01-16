import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  CLIENT_DETAILS,
  ONLINE_CLIENTS,
  REGISTER_CLIENT,
} from '../consts/clients-api';
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
      `${environment.API_URL}/${ONLINE_CLIENTS}`
    );
  }

  getClientDetails(username: string) {
    return this.http.get<ClientDetails>(
      `${environment.API_URL}/${CLIENT_DETAILS}/${username}`
    );
  }

  registerClient(client: RegisterClient) {
    return this.http.post<any>(
      `${environment.API_URL}/${REGISTER_CLIENT}`,
      client
    );
  }
}
