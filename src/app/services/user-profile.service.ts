
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import User from '../models/User';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private searchParam: string;
  searchEvent = new EventEmitter();
  updateURL : string = `${environment.baseUrl}/update`;
  currentUser: User;

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.currentUser = authService.currentUser;
  }

  updateUser(email:string,password:string,firstName:string,lastName:string,
    username:string, location:string, namePronunciation: string, professionalURL: string, id: any, profilePic: string) {
      //console.log("updateUser id:" + id);
      const payload = {firstName:firstName,lastName:lastName,email: email, password:password, location:location,
        username:username,professionalURL:professionalURL,namePronunciation:namePronunciation,id:id,profilePic:profilePic};
        //console.log('current user'+ this.currentUser);
      return this.http.put(this.updateURL, payload,{headers: environment.headers});

  }

  public getUserById(id: string): Observable<User> {
    const url = `${environment.baseUrl}/user-profile`;
    let queryParams = new HttpParams().append("id", id);
    return this.http.get<User>(url, {params:queryParams});
  }

  public setSearchParam(search:string){
    this.searchParam = search;
    this.searchEvent.emit(this.searchParam);
  }

  public getSearchParam(){
    return this.searchParam;
  }
  
  public findUsers(searchParam: string): Observable<User[]>{
    let queryParams = new HttpParams().append("user", searchParam);
    return this.http.get<User[]>(`${environment.baseUrl}/search`, {params:queryParams}) 
  }
}
