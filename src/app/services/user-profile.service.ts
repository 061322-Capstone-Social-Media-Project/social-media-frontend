
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import User from '../models/User';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  updateURL : string = `${environment.baseUrl}/update`;
  currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.currentUser = authService.currentUser;
  }

  updateUser(email:string,password:string,firstName:string,lastName:string,
    username:string, location:string, namePronunciation: string, professionalURL: string, id: any, profilePic: string) {
      //console.log("updateUser id:" + id);
      const payload = {firstName:firstName,lastName:lastName,email: email, password:password, location:location,
        username:username,professionalURL:professionalURL,namePronunciation:namePronunciation,id:this.currentUser.id,profilePic:profilePic};
        //console.log('current user'+ this.currentUser);
      this.http.put(this.updateURL, payload,{headers: environment.headers}).subscribe(val=>{
        console.log('updating:');
        console.log(val);
        //this.authService.currentUser = val as User;
      });

  }

  public getUserById(id: string): Observable<User> {
    const url = `${environment.baseUrl}/user-profile`;
    let queryParams = new HttpParams().append("id", id);
    return this.http.get<User>(url, {params:queryParams});
  }
}
