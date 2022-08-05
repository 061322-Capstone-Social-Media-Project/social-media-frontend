import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {

  followersUrl: string = `${environment.baseUrl}/followers`
  followingUrl: string = `${environment.baseUrl}/following`
  followers: User[]
  following: User[]

  constructor(private http: HttpClient, private auth: AuthService) {
    this.getFollowers().subscribe((response) => {
      this.followers = response;
    })
    this.getFollowing().subscribe((response) => {
      this.following = response;
    })
   }

  getCurrentUser(): User {
    return this.auth.currentUser
  }

  getFollowing(): Observable<User[]> {
    return this.http.get<User[]>(`${this.followingUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials} )
  }

  getFollowers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.followersUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials} )
  }

  addFollowing(userId: number): Observable<any> {
    return this.http.post<User[]>(`${this.followingUrl}`, 
    {
      'followerId' : this.getCurrentUser().id,
      'followingId' : userId
    }, {headers: environment.headers, withCredentials: environment.withCredentials} )
  }

  removeFollowing(userId: number): Observable<any> {
    return this.http.delete<User[]>(`${this.followingUrl}`, { headers: environment.headers,
    body: {
      'followerId' : this.getCurrentUser().id,
      'followingId' : userId
    }})
  }
}
