import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Likes } from '../models/likes';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  likesUrl: string = `${environment.baseUrl}/likes`


  constructor(private http: HttpClient) { }

  postLike(likes: Likes) {

    return this.http.post<Likes>(this.likesUrl, likes, { headers: environment.headers, withCredentials: environment.withCredentials });
  }
  removeLike(id: number) {

    return this.http.delete<Likes>(`${this.likesUrl}/${id}`);
  }
  getLike(user_id: number, post_id: number): Observable<Likes> {
    return this.http.get<Likes>(`${this.likesUrl}/user/${user_id}/post/${post_id}`);

  }
  countLike(post_id: number){
    return this.http.get<number>(`${this.likesUrl}/count/post/${post_id}`);
  }

}

