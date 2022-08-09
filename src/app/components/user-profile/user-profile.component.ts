import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import Post from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HobbyService } from 'src/app/services/hobby.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  loggedInUser: User;
  posts: Post[] = [];
  id: string;
  hobby1:string;
  hobby2:string;
  hobby3:string;

  constructor(private userProfileService: UserProfileService, private authService: AuthService,
     private postService: PostService, private router:Router, private route: ActivatedRoute, private hobbyService: HobbyService) { 
      //console.log("the constructor is called");
      //this.user = authService.currentUser;
      this.ngOnInit();
  }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = params['id'];
      }
    );
    this.loggedInUser = this.authService.currentUser;
    this.userProfileService.getUserById(this.id).subscribe(
      (response) => {
        this.user = response
      }
    )
    this.postService.getAllPosts().subscribe(
      (response) => {
        this.posts = response;
      }
    )
    this.hobbyService.getAllHobbies(this.id).subscribe(
      (response) => {
        this.hobby1 = response.hobby1;
        this.hobby2 = response.hobby2;
        this.hobby3 = response.hobby3;
      }
    )
    // console.log("Current user: " + JSON.stringify(this.authService.currentUser));
  }

  updateUser(){
    this.router.navigate(['update-user']);
  }

  toUserProfilePicture(){
    this.router.navigate(['user-profile-picture']);
  }
}