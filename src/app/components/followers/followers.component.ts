import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})

export class FollowersComponent implements OnInit {

  users: User[] = [];
  unFollowUserId: number;
  prev: string = "";
  next: string = "";
  offsetBy: number = 0;
  pageNumber: number = 1;
  constructor() { 
    this.users.push(new User(2, "ah@gmail.com", "Adam", "Harbeck"));
    this.users.push(new User(3, "cp@gmail.com", "Calvin", "Post"));
    this.users.push(new User(4, "tr@gmail.com", "Trey", "Ratcliff"));
    this.users.push(new User(5, "lm@gmail.com", "Lane", "McSpadden"));
    this.users.push(new User(6, "sz@gmail.com", "Shouchuang", "Zhu"));
    this.users.push(new User(7, "be@gmail.com", "Bryan", "Epperson"));
    this.next = `${environment.baseUrl}/followers?offset=${this.offsetBy}&limit=10`
  }

  ngOnInit(): void {
  }

  getMsgFromChild($event: number) {
    this.unFollowUserId = $event;
    console.log(this.unFollowUserId);
  }

  getNext() {
    this.offsetBy = this.offsetBy + 10;
    this.pageNumber = this.pageNumber + 1;
    console.log(this.offsetBy + " " + this.pageNumber);
    this.next = `${environment.baseUrl}/followers?offset=${this.offsetBy}&limit=10`
    if(this.offsetBy == 10) {
      this.prev = `${environment.baseUrl}/followers?limit=10`
    }else {
      this.prev = `${environment.baseUrl}/followers?offset=${this.offsetBy - 10}&limit=10`
    }
    
  }

  getPrev() {
    this.pageNumber = this.pageNumber - 1;
    this.offsetBy = this.offsetBy - 10;
    console.log(this.offsetBy + " " + this.pageNumber);
    if(this.offsetBy != 0 && this.offsetBy == 10) {
      this.prev = `${environment.baseUrl}/followers?limit=10`;
    } else if (this.offsetBy != 0 && this.offsetBy > 10){
      this.prev = `${environment.baseUrl}/followers?offset=${this.offsetBy}&limit=10`;
    } else {
      this.prev = "";
    }
  }
}
