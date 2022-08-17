import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  user: User = {} as User;

  constructor(private authService: AuthService, private us: UserProfileService) { }

  ngOnInit(): void {
    this.us.getUserById(this.authService.currentUser.id.toString()).subscribe(
      (response) => {
        this.user = response;
      }
    );
  }

}
