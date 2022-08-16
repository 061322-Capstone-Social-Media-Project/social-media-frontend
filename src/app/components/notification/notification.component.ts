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
        map(notifications =>
          notifications.filter(notification =>
            ['READ', 'UNREAD'].includes(notification.status)
          )
        ),
        tap(data => {
          this.notifications = data;
         
        })
      )
      .subscribe();
  }

  unreadNotifications() {
    return this.notifications.filter(
      notification => notification.status === 'UNREAD'
    ).length;
  }

  dismissNotification(n: Notify) {
    n.status = 'DISMISS';
    this.ns.updateNotification(n).subscribe();
  }

  readNotification(n: Notify) {
    if (!['READ', 'DISMISS'].includes(n.status)) {
      n.status = 'READ';
      this.ns.updateNotification(n).subscribe();
    }
  }

  readAll() {
    this.notifications.forEach(notification => {
      this.readNotification(notification);
    });
  }

  dismissAll() {
    this.notifications.forEach(notification => {
      this.dismissNotification(notification);
    });
  }
}
