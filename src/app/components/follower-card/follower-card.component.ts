import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import User from 'src/app/models/User';


@Component({
  selector: 'app-follower-card',
  templateUrl: './follower-card.component.html',
  styleUrls: ['./follower-card.component.css']
})
export class FollowerCardComponent implements OnInit {

  @Input() user: User;
  @Output() callParent = new EventEmitter();
  userId: number;
  constructor() { }

  ngOnInit(): void {
  }

  unfollow(id: number) {
    this.userId = id;
    this.callParent.emit(this.userId);
  }
}
