import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import Post from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = {} as User;
  posts: Post[] = [];

  constructor(private authService: AuthService, private postService: PostService) { 
  }

  ngOnInit(): void {
    this.user = this.authService.currentUser
    this.postService.getAllPosts().subscribe(
      (response) => {
        this.posts = response
      }
    )
  }

}
