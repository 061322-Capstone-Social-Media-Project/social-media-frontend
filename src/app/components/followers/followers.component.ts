import { Component, Input, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { FollowerService } from 'src/app/services/follower.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})

export class FollowersComponent implements OnInit {

  @Input() user: User;
  principal: User;
  users: User[] = [];
  count: number;
  unFollowUserId: number;
  view: string = 'following'
  prev: string = "";
  next: string = "";
  offsetBy: number = 0;
  pageNumber: number = 1;
  constructor(private fs: FollowerService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.principal = this.auth.currentUser;
    this.user = this.fs.user;
    if (!this.user || this.user.id == this.principal.id) {
      this.user = this.principal;
    }
    this.fs.getUsers(`${environment.baseUrl}/${this.view}/user/${this.user.id}?limit=10`).subscribe((data: any) => {
      this.users = data;
    })
    this.fs.getCount(`${environment.baseUrl}/${this.view}/user/${this.user.id}/count`).subscribe((data: any) => {
      this.count = data.count
    })
    if (this.count > 10) {
      this.next = `${environment.baseUrl}/${this.view}/user/${this.user.id}?offset=${this.offsetBy}&limit=10`
    } else {
      this.next = ""
    }
  }

  getMsgFromChild($event: number) {
    this.unFollowUserId = $event;

    this.fs.removeFollowing(this.unFollowUserId).subscribe(response => {
      this.ngOnInit();
    });
  }

  getNext() {
    this.fs.getUsers(this.next).subscribe((data: any) => {
      this.users = data;
    })
    this.offsetBy = this.offsetBy + 10;
    this.pageNumber = this.pageNumber + 1;
    if (this.offsetBy + 10 > this.count) {
      this.next = ""
    } else {
      this.next = `${environment.baseUrl}/${this.view}/user/${this.user.id}?offset=${this.offsetBy}&limit=10`
    }
    if (this.offsetBy == 10) {
      this.prev = `${environment.baseUrl}/${this.view}/user/${this.user.id}?limit=10`
    } else {
      this.prev = `${environment.baseUrl}/${this.view}/user/${this.user.id}?offset=${this.offsetBy - 10}&limit=10`
    }
  }

  getPrev() {
    this.fs.getUsers(this.prev).subscribe((data: any) => {
      this.users = data;
    })
    this.pageNumber = this.pageNumber - 1;
    this.offsetBy = this.offsetBy - 10;
    if (this.offsetBy != 0 && this.offsetBy == 10) {
      this.prev = `${environment.baseUrl}/${this.view}/user/${this.user.id}?limit=10`;
    } else if (this.offsetBy != 0 && this.offsetBy > 10) {
      this.prev = `${environment.baseUrl}/${this.view}/user/${this.user.id}?offset=${this.offsetBy}&limit=10`;
    } else {
      this.prev = "";
    }
  }

  toggle() {
    if (this.view == 'following') {
      this.view = 'followers'
    } else {
      this.view = 'following'
    }
    this.ngOnInit();
  }

}
