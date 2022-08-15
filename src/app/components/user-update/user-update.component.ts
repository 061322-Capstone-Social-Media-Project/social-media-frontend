import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { HobbyService } from 'src/app/services/hobby.service';
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

  hobby1:string;
  hobby2:string;
  hobby3:string;
  hobbyID: any;
  isNullHobby: boolean;
  profilePic: string;


  constructor(private authService: AuthService, private userService: UserProfileService, private router: Router, private hobbyService: HobbyService) {
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
    this.profilePic = this.currentUser.profilePic;
    // this.ngOnInit();
   }

  ngOnInit(): void {
    this.hobbyService.getAllHobbies(this.id).subscribe(
      (response) => {
        if(response !== null){
        this.hobby1 = response.hobby1;
        this.hobby2 = response.hobby2;
        this.hobby3 = response.hobby3;
        this.hobbyID = response.id;
      }else{
        this.isNullHobby = true;
      }
      }
    )
  }


  updateUser(){
    this.userService.updateUser(this.email,this.password,this.firstName,this.lastName,this.username,
      this.location, this.namePronunciation, this.professionalUrl, this.id, this.profilePic);
    if(this.isNullHobby === true){
      console.log(this.id);
      this.hobbyService.createHobby(this.hobby1,this.hobby2,this.hobby3,this.id);
    }else{
    this.hobbyService.updateUserHobbies(this.hobby1,this.hobby2,this.hobby3,this.hobbyID);
    }
  }
}
