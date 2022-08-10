import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Hobby from '../models/Hobby';
import User from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HobbyService {

  constructor(private authService: AuthService, private http: HttpClient) {
   }

  public getAllHobbies(id: string): Observable<Hobby>{
    const url = `${environment.baseUrl}/hobby`;
    let queryParams = new HttpParams().append("id", id);
    return this.http.get<Hobby>(url, {params:queryParams});
  }

  updateUserHobbies(hobby1:string,hobby2:string,hobby3:string, id: any){
      const payload = {hobby1:hobby1,hobby2:hobby2,hobby3:hobby3,id:id};
      const url = `${environment.baseUrl}/hobby`;
      this.http.put(url, payload,{headers: environment.headers}).subscribe(val=>{
      console.log('updating:');
      console.log(val);
    });
  }

  createHobby(hobby1: string, hobby2:string, hobby3:string, userId: any){
    console.log(userId);
    const payload = {hobby1:hobby1,hobby2:hobby2,hobby3:hobby3,userId:userId};
    const url = `${environment.baseUrl}/hobby`;
    this.http.post(url, payload,{headers: environment.headers}).subscribe(val=>{
      console.log('creating:');
      console.log(val);
    });
  }
}
