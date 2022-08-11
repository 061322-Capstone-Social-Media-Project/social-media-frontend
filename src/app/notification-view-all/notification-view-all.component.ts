import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notify } from 'src/app/models/notification';

@Component({
  selector: 'app-notification-view-all',
  templateUrl: './notification-view-all.component.html',
  styleUrls: ['./notification-view-all.component.css']
})
export class NotificationViewAllComponent implements OnInit {

  notifications: Notify[];


  constructor(private ns: NotificationService, private as: AuthService) { }

  ngOnInit(): void {
    this.getNotifications()
    
  }

  getNotifications(){
    this.ns.getNotifications(this.as.currentUser.id).pipe(
      tap((data)=>{this.notifications = data
        console.log(this.notifications)})
    ).subscribe()

  }

}
