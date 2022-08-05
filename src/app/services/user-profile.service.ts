import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import User from '../models/User';
import { AuthService } from './auth.service';

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
    username:string, location:string, namePronunciation: string, professionalURL: string, profilePic:string){
      const payload = {firstName:firstName,lastName:lastName,email: email, password:password, location:location,
        username:username,professionalURL:professionalURL,namePronunciation:namePronunciation, 
        profilePic:profilePic,id:this.currentUser.id};
        console.log('current user'+ this.currentUser);
      this.http.put(this.updateURL, payload,{headers: environment.headers}).subscribe(val=>{
        console.log('updating:');
        console.log(val);
      });

  }
}
