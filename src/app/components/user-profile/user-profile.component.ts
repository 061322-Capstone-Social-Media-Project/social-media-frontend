import { Component, OnDestroy, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import Post from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HobbyService } from 'src/app/services/hobby.service';
import { FollowerService } from 'src/app/services/follower.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  user: User;
  loggedInUser: User;
  isFollowing: boolean
  posts: Post[] = [];
  id: string;
  followingCount: number;
  followerCount: Number;
  hobby1:string;
  hobby2:string;
  hobby3:string;

  constructor(private userProfileService: UserProfileService, private authService: AuthService, private followService: FollowerService,
     private postService: PostService, private router:Router, private route: ActivatedRoute, private hobbyService: HobbyService) { 
  }

  ngOnInit(): void {
    this.isFollowing = false;
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
          this.isFollowing = data.following;
        })
        this.followService.getCount(`${environment.baseUrl}/followers/user/${response.id}/count`).subscribe((count:any) => {
          this.followerCount = count.count;
        })
        this.followService.getCount(`${environment.baseUrl}/following/user/${response.id}/count`).subscribe((count:any) => {
          this.followingCount = count.count;
        })
      })
    this.postService.getAllPosts().subscribe(
      (response) => {
        this.posts = response;
      }
    )
    this.hobbyService.getAllHobbies(this.id).subscribe(
      (response) => {
        if(response !== null){
          if(response.hobby1 !== null){
          this.hobby1 = response.hobby1;
          }
          if(response.hobby2 !== null){
          this.hobby2 = response.hobby2;
          }
          if(response.hobby3 !== null){
          this.hobby3 = response.hobby3;
          }
        }
      }
    )
  }

  updateUser(){
    this.router.navigate(['update-user']);
  }

  follow() {
    this.followService.addFollowing(this.user.id).subscribe(_ => {
      this.ngOnInit();
    });

  }

  unfollow() {
    this.followService.removeFollowing(this.user.id).subscribe(_ => {
      this.ngOnInit();
    });

  }

  ngOnDestroy() {
    this.followService.user = this.user
  }

}
