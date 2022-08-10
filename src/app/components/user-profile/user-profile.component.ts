import { Component, OnDestroy, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import Post from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FollowerService } from 'src/app/services/follower.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: User;
  loggedInUser: User;
  following: boolean
  posts: Post[] = [];
  id: string;

  constructor(private userProfileService: UserProfileService, private authService: AuthService, private followService: FollowerService,
     private postService: PostService, private router:Router, private route: ActivatedRoute) { 
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
        this.followService.isFollowing(response.id).subscribe((data:any) => {
          console.warn(data)
          this.following = data.following;
          console.log(this.following)
        })
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

  follow() {
    console.log('executing follow')
    this.followService.addFollowing(this.user.id).subscribe();
    this.ngOnInit()
  }

  unfollow() {
    console.log('executing unfollow')
    this.followService.removeFollowing(this.user.id).subscribe();
    this.ngOnInit();
  }

  ngOnDestroy() {
    this.followService.user = this.user
  }

}
