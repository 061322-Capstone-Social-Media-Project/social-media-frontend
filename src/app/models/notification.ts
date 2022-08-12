import { notificationType } from "./notificationType";

export class Notify {

	 id: number
	 notificationBody: string
	 userId: number
	 type: notificationType;
	 timeStamp: string

     constructor(id: number,notificationBody: string,userId: number,type: notificationType,timeStamp: string){
        this.id = id;
        this.notificationBody = notificationBody;
        this.userId = userId;
        this.type = type;
        this.timeStamp = timeStamp;
     }
}
