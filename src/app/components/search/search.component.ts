import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  users: User[] = [];
  followUserId: number;

  constructor() { 
    // this.users.push(new User(2, "ah@gmail.com", "Adam", "Harbeck"));
    // this.users.push(new User(3, "cp@gmail.com", "Calvin", "Post"));
    // this.users.push(new User(4, "tr@gmail.com", "Trey", "Ratcliff"));
    // this.users.push(new User(5, "lm@gmail.com", "Lane", "McSpadden"));
    // this.users.push(new User(6, "sz@gmail.com", "Shouchuang", "Zhu"));
    // this.users.push(new User(7, "be@gmail.com", "Bryan", "Epperson"));
  }

  ngOnInit(): void {
  }

}
