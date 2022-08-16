import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';
import { TokenStorageService, TOKEN_KEY } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl: string = `${environment.baseUrl}`;
  currentUser: User;

  constructor(
    private http: HttpClient,
    private tokeStorage: TokenStorageService
  ) {
    this.currentUser = JSON.parse(
      localStorage.getItem('user_info') || '{}'
    ) as User;
  }

  login(email: string, password: string): Observable<any> {
    const payload = { email: email, password: password };
    return this.http
      .post<any>(`${this.authUrl}/login`, payload, {
        headers: environment.headers,
      })
      .pipe(
        tap(body => {
          this.tokeStorage.saveToken(body[TOKEN_KEY]);
        }),
        mergeMap(_ => {
          const url = `${environment.baseUrl}/user-profile`;
          let queryParams = new HttpParams().append(
            'id',
            this.getPrincipalId()!
          );
          return this.http.get<User>(url, { params: queryParams });
        }),
        tap(user => {
          localStorage.setItem('user_info', JSON.stringify(user));
          this.currentUser = JSON.parse(
            localStorage.getItem('user_info') || '{}'
          ) as User;
        })
      );
  }

  getPrincipal() {
    let token = this.tokeStorage.getDecodedAccessToken();
    return token?.sub;
  }

  getPrincipalId() {
    let token = this.tokeStorage.getDecodedAccessToken();
    return token?.id;
  }

  isLoggedIn() {
    return Math.floor(new Date().getTime() / 1000) < this.getExpiration();
  }

  getExpiration() {
    let token = this.tokeStorage.getDecodedAccessToken();
    return token ? token.exp : NaN;
  }

  logout(): void {
    this.tokeStorage.deleteToken();
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    username: string
  ): Observable<any> {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      username: username,
    };
    return this.http.post<any>(`${this.authUrl}/register`, payload, {
      headers: environment.headers,
    });
  }
}
