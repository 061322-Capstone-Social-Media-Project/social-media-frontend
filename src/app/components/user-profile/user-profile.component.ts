import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = {} as User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser
  }

}
