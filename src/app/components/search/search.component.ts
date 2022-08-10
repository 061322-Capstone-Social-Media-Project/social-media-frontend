import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import User from 'src/app/models/User';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  searchParam: string;
  users: User[] = [];
  followUserId: number;

  constructor(private us: UserProfileService, private activated:ActivatedRoute, private router:Router ) { 
    // this.users.push(new User(2, "ah@gmail.com", "Adam", "Harbeck"));
    // this.users.push(new User(3, "cp@gmail.com", "Calvin", "Post"));
    // this.users.push(new User(4, "tr@gmail.com", "Trey", "Ratcliff"));
    // this.users.push(new User(5, "lm@gmail.com", "Lane", "McSpadden"));
    // this.users.push(new User(6, "sz@gmail.com", "Shouchuang", "Zhu"));
    // this.users.push(new User(7, "be@gmail.com", "Bryan", "Epperson"));
  }

  ngOnInit(): void {
    this.us.searchEvent.subscribe({
      next: (data: any) => {this.searchParam = data,
        this.search()
      }
    });
    this.searchParam = this.us.getSearchParam();
    this.search();
  }


  search(){
    this.us.findUsers(this.searchParam).subscribe(data =>
      {
        this.users = data;
      });
  }
}
