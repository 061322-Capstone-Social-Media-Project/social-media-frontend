import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import User from 'src/app/models/User';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  searchParam: string;
  users: User[] = [];

  constructor(private us: UserProfileService) { 
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
        console.log(this.users);
      });
  }
}
