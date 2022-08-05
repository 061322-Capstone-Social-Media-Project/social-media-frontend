import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { LikesService } from 'src/app/services/likes.service';
import { Likes } from 'src/app/models/likes';
import { empty } from 'rxjs';

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
  replyToPost: boolean = false
  like: boolean = false
  like_text: String 
  likes:Likes
  likeId: number;

  constructor(private postService: PostService, private authService: AuthService, private ls: LikesService) { }

  ngOnInit(): void {
    console.log(this.post)
    //sending
   this.ls.getLike(this.authService.currentUser.id,this.post.id).subscribe((response)=>{ 
      if(response != null){
        this.likeId = response.id;
        this.like_text = "Unlike"


    }else{
      this.like_text = "Like" 
    }
     
    })


  }

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }
  likeSwitch = () => {
    
    if(this.like == true){
    this.likes = new Likes(0,this.post.author.id,this.post.id);

      this.ls.postLike(this.likes);

    }else{

     
    }
    
    this.like = !this.like
    this.ls.getLike(this.authService.currentUser.id,this.post.id).subscribe((response)=>{console.log(response)});
  }

  submitReply = (e: any) => {
    e.preventDefault()
    let newComment = new Post(0, this.commentForm.value.text || "", "", this.authService.currentUser, [])
    this.postService.upsertPost({...this.post, comments: [...this.post.comments, newComment]})
      .subscribe(
        (response) => {
          this.post = response
          this.toggleReplyToPost()
        }
      )
  }
}
