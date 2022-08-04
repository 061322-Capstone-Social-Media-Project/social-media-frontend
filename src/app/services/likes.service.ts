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
    console.log(likes)
    console.log(this.likesUrl)
    return this.http.post<Likes>(this.likesUrl,likes, {headers: environment.headers, withCredentials: environment.withCredentials}).subscribe()
  }
  removeLike(id: number){

    return this.http.delete<Likes>(`${this.likesUrl}/${id}`).subscribe()
  }
  getLike(post_id: number,user_id: number){

    
  }
}

