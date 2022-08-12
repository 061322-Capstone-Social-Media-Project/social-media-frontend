import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  @Output() getParam = new EventEmitter();
  searchParam!: string;

  constructor(private authService: AuthService, private router: Router, private us: UserProfileService) { }
  
  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  search(){
    if(this.searchParam.length > 0){
      this.us.setSearchParam(this.searchParam);
      this.router.navigate(['search']);
    }
  }

}
