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
   }

  ngOnInit(): void {
    this.userService.getUserById(this.authService.currentUser.id.toString()).subscribe(
      (response) => {
        this.currentUser = response;
        this.id = response.id;
        this.email = response.email;
        this.firstName = response.firstName;
        this.lastName = response.lastName;
        this.username = response.username;
        this.password = response.password;
        this.professionalUrl = response.professionalURL;
        this.location = response.location;
        this.namePronunciation = response.namePronunciation;
        this.profilePic = response.profilePic;
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
      });

  }


  updateUser(){
    this.userService.updateUser(this.email,this.password,this.firstName,this.lastName,this.username,
      this.location, this.namePronunciation, this.professionalUrl, this.id, this.profilePic).subscribe(
        (response: any) => {
          this.currentUser = response;
          this.router.navigate(
            ['/user-profile'],
            { queryParams: { id: this.currentUser.id } }
          );

        });
    if(this.isNullHobby === true){
      console.log(this.id);
      this.hobbyService.createHobby(this.hobby1,this.hobby2,this.hobby3,this.id);
    }else{
    this.hobbyService.updateUserHobbies(this.hobby1,this.hobby2,this.hobby3,this.hobbyID);
    }
  }
}
