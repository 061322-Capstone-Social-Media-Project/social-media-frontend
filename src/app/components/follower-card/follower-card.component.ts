import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import User from 'src/app/models/User';


@Component({
  selector: 'app-follower-card',
  templateUrl: './follower-card.component.html',
  styleUrls: ['./follower-card.component.css']
})
export class FollowerCardComponent implements OnInit {

  @Input() view: string;
  @Input() principal: boolean;
  @Input() user: User;
  @Output() callParent = new EventEmitter();
  
  constructor() {}

  ngOnInit(): void {
    console.log(this.principal)
  }

  unfollow() {
    this.callParent.emit(this.user.id);
  }
}
