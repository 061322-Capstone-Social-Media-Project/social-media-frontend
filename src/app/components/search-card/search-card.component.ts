import { Component, Input, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { FollowerService } from 'src/app/services/follower.service';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.css']
})
export class SearchCardComponent implements OnInit {

  
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
  }
}
