import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { User } from '../models/API_Classes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
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
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('isLoggedIn', 'true');
            this.currentUserSubject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    this.http.post<any>(`${environment.API_URL}/logout-client`, {});
    localStorage.removeItem('currentUser');
    localStorage.setItem('isLoggedIn', 'false');
    this.currentUserSubject.next(null);
    
  }
}
