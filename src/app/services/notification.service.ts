import { EnvironmentInjector, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationUrl: string =  `${environment.baseUrl}/notification`
 

  constructor(private http: HttpClient) { }

  getNotifications(user_id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.notificationUrl}/user/${user_id}`);

  }
}


