import { Component, Input, OnInit } from '@angular/core';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { LikesService } from 'src/app/services/likes.service';
import { Likes } from 'src/app/models/likes';
import { tap } from 'rxjs';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css'],
})
export class LikesComponent implements OnInit {
  @Input('post') post: Post;
  like: boolean;
  like_text: String;
  likes: Likes;
  likeId: number;
  likeButton: boolean;
  likeCounter: number = 0;
  constructor(private authService: AuthService, private ls: LikesService) {}
  ngOnInit(): void {
    this.setLikes();
    this.likeButton = false;
  }

  likeSwitch = () => {
    this.likeButton = true;
    if (this.like === true) {
      this.likes = new Likes(0, this.authService.currentUser.id, this.post.id);
      this.ls.postLike(this.likes).subscribe(
        response => {
          this.setLikes();
        },
        error => {
          this.setLikes();
        }
      );
    } else {
      this.ls.removeLike(this.likeId).subscribe(
        response => {
          this.setLikes();
        },
        error => {
          this.setLikes();
        }
      );
    }
    this.like = !this.like;
  };

  setLikes() {
    this.ls.getLike(this.authService.currentUser.id, this.post.id).subscribe(
      response => {
        if (response != null) {
          this.likeId = response.id;
          this.like_text = 'Unlike';
          this.like = false;
          this.likeButton = false;
        } else {
          this.like_text = 'Like';
          this.like = true;
          this.likeButton = false;
        }
        this.ls
          .countLike(this.post.id)
          .pipe(tap(count => (this.likeCounter = count)))
          .subscribe();
      },
      error => {}
    );
  }
}
