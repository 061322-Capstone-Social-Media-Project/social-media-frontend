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

  constructor(private http: HttpClient, private auth: AuthService) {
  }

  getFollowing(): Observable<User[]> {
    console.log('getFollowing invoked')
    return this.http.get<User[]>(`${this.followingUrl}`, { headers: environment.headers, withCredentials: environment.withCredentials })
  }

  getFollowers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.followersUrl}`, { headers: environment.headers, withCredentials: environment.withCredentials })
  }

  addFollowing(followingId: number): Observable<any> {
    return this.http.post(`${this.followingUrl}`,
      {
        'followerId': this.auth.currentUser.id,
        'followingId': followingId
      }, { headers: environment.headers, withCredentials: environment.withCredentials })
  }

  removeFollowing(followingId: number): Observable<any> {
    return this.http.delete(`${this.followingUrl}`, {
      headers: environment.headers, withCredentials: environment.withCredentials,
      body: {
        'followerId': this.auth.currentUser.id,
        'followingId': followingId
      }
    })
  }
}
