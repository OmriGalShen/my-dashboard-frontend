import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { User } from '../models/API_Classes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public userObservable: Observable<User>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(null);
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.API_URL}/login-client`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          if (user) {
            this.userSubject.next(user);
          }
          return user;
        })
      );
  }

  logout(username: string) {
    return this.http
      .post<any>(`${environment.API_URL}/logout-client/${username}`, {})
      .pipe(
        map((res) => {
          this.userSubject.next(null);
          return res;
        })
      );
  }
}
