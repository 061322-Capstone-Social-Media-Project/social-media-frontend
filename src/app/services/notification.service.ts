import { EnvironmentInjector, Injectable } from '@angular/core';
import { mergeAll, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Notify } from '../models/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationUrl: string = `${environment.baseUrl}/notification`;

  constructor(private http: HttpClient) {}

  getNotifications(user_id: number): Observable<Notify[]> {
    return this.http.get<Notify[]>(`${this.notificationUrl}/user/${user_id}`);
  }

  updateNotification(n: Notify) {
    return this.http.put(`${this.notificationUrl}`, n, {
      headers: environment.headers, 
    });
  }
}
