import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  notifications: Notification[];

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
