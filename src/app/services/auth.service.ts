import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): void {
    this.http
      .post<any>(`${environment.API_URL}/login-client`, { email, password })
      .pipe(tap((_) => console.log('fetched login'))).subscribe(data  => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username',data.username);
      })
  }

  logout(): void {
    this.http.post<any>(`${environment.API_URL}/login-client`,{});
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('username');
  }
}
