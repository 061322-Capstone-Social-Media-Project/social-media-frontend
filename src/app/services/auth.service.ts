import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${environment.baseUrl}/auth`;
  currentUser: User

  constructor(private http: HttpClient) { 
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}') as User;
  }

  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    const res = this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
    res.subscribe((data) => {
      localStorage.setItem('currentUser', JSON.stringify(data));
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}') as User;
    })
    return res;
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null).subscribe();
    localStorage.removeItem('currentUser');
  }

  register(firstName: string, lastName: string, email: string, password: string, username: string, profilePic: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password, username: username, profilePic: profilePic};
    return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }
}