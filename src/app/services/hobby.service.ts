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

  updateUserHobbies(hobby1:string,hobby2:string,hobby3:string){
    console.log("updateUserHobbies");
    console.log(hobby1);
    console.log(hobby2);
    console.log(hobby3);


  }
}
