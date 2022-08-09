import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  location:string;
  namePronunciation:string;


  constructor(private authService: AuthService, private userService: UserProfileService, private router: Router) {
    this.currentUser = authService.currentUser;
    this.id = this.currentUser.id;
    this.email = this.currentUser.email;
    this.firstName = this.currentUser.firstName;
    this.lastName = this.currentUser.lastName;
    this.username = this.currentUser.username;
    this.password = this.currentUser.password;
    this.professionalUrl = this.currentUser.professionalURL;
    this.location = this.currentUser.location;
    this.namePronunciation = this.currentUser.namePronunciation;
   }

  ngOnInit(): void {
  }


  updateUser(){
    this.userService.updateUser(this.email,this.password,this.firstName,this.lastName,this.username,
      this.location,this.namePronunciation,this.professionalUrl, this.id);

      //this.router.navigate(['user-profile', {id:this.id}]); 

  }
}
