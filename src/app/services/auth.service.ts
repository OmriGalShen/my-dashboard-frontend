import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/API_Classes';
import { LOGIN_CLIENT, LOGOUT_CLIENT } from '../consts/clients-api';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public userObervable: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.userObervable = this.userSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.API_URL}/${LOGIN_CLIENT}`, { email, password })
      .pipe(
        map((user) => {
          this.userSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    this.http.post<any>(`${environment.API_URL}/${LOGOUT_CLIENT}`, {});
    this.userSubject.next(null);
  }
}
