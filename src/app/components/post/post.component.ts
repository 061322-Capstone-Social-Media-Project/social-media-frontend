import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { LikesService } from 'src/app/services/likes.service';
import { Likes } from 'src/app/models/likes';
import { empty, Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  @Input('post') post: Post
  replyToPost: boolean = false;
  like: boolean;
  like_text: String;
  likes: Likes;
  likeId: number;
  likeButton: boolean;
  constructor(private postService: PostService, private authService: AuthService, private ls: LikesService) { }

  ngOnInit(): void {
    //sending
    this.setLikes();
    this.likeButton = false;
  }

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }
  likeSwitch = () => {
    this.likeButton = true;
    if (this.like === true) {
      console.log("add");
      this.likes = new Likes(0, this.post.author.id, this.post.id);

      this.ls.postLike(this.likes).subscribe((response) => {
        this.like_text = "Unlike";
        this.like = false;
        this.setLikes();
        this.likeButton = false;
      }, (error) => {
        console.log("error");
        console.log(error);
      }
      );
    } else if (this.like === false) {
      this.ls.removeLike(this.likeId).subscribe((response) => {
        this.like_text = "Like";
        this.like = true;
        this.setLikes();
        this.likeButton = false;
      }, (error) => {
        console.log("error");
        console.log(error);
      }
      );
    }

    this.like = !this.like

  }

  submitReply = (e: any) => {
    e.preventDefault()
    let newComment = new Post(0, this.commentForm.value.text || "", "", this.authService.currentUser, [])
    this.postService.upsertPost({ ...this.post, comments: [...this.post.comments, newComment] })
      .subscribe(
        (response) => {
          this.post = response
          this.toggleReplyToPost()
        }
      )
  }

  setLikes() {
    this.ls.getLike(this.authService.currentUser.id, this.post.id).subscribe((response) => {
      if (response != null) {
        this.likeId = response.id;
        this.like_text = "Unlike";
        this.like = false;
      } else {
        this.like_text = "Like";
        this.like = true;

      }

    }, (error) => {
      console.log("error");
      console.log(error);
    }
    );
  }
}
