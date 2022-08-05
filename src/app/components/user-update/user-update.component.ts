import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  currentUser: User;
  id:any;
  email: string;
  firstName:string;
  lastName: string;
  username:string;
  password:string;
  professionalUrl:string;
  profilePic: string;
  location:string;
  namePronunciation:string;


  constructor(private authService: AuthService, private userService: UserProfileService) {
    this.currentUser = authService.currentUser;
    this.id = this.currentUser.id;
    this.email = this.currentUser.email;
    this.firstName = this.currentUser.firstName;
    this.lastName = this.currentUser.lastName;
    this.username = this.currentUser.username;
    this.password = this.currentUser.password;
    this.professionalUrl = this.currentUser.professionalURL;
    this.profilePic = this.currentUser.profilePic;
    this.location = this.currentUser.location;
    this.namePronunciation = this.currentUser.namePronunciation;
    console.log(this.currentUser);
   }

  ngOnInit(): void {
  }


  updateUser(){
    //console.log(this.currentUser);
    
    this.userService.updateUser(this.email,this.password,this.firstName,this.lastName,this.username,
      this.location,this.namePronunciation,this.professionalUrl,this.profilePic);
  }
}
