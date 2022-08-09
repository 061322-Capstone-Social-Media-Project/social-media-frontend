import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import Post from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(private userProfileService: UserProfileService, private authService: AuthService,
     private postService: PostService, private router:Router, private route: ActivatedRoute) { 
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
    // console.log("Current user: " + JSON.stringify(this.authService.currentUser));
  }

  updateUser(){
    this.router.navigate(['update-user']);
  }

  toUserProfilePicture(){
    this.router.navigate(['user-profile-picture']);
  }

}
