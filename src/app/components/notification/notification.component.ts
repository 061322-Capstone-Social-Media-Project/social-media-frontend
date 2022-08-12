import { Component, OnInit } from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Notify } from 'src/app/models/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: Notify[] = [];

  constructor(private ns: NotificationService, private as: AuthService) {}

  ngOnInit(): void {
    this.getNotifications();
    
  }

  getNotifications() {
    this.ns
      .getNotifications(this.as.currentUser.id)
      .pipe(
        map(data => {
          return data.filter(notification => {
            if (
              notification.status === 'NEW' ||
              notification.status === 'UNREAD'
            ) {
              return true;
            } else {
              return false;
            }
          });
        }),
        tap(data => {
          this.notifications = data;
          console.log(this.notifications);
        })
      )
      .subscribe();
  }

  clickBell() {
    this.notifications.forEach(n => {
      n.status = 'UNREAD'
      this.ns.updateNotification(n).subscribe(_ => this.getNotifications());
    });
    
  }

  countNewNotifications() {
    return this.notifications.filter(notification => {
      if (notification.status === 'NEW') {
        return true;
      } else {
        return false;
      }
    }).length;
  }

  updateNotification(n: Notify) {
    n.status = 'READ';
    this.ns.updateNotification(n).subscribe(_ => this.getNotifications());
  }
}
