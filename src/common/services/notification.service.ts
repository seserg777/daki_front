import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { NotificationModel } from '../models/notification.model';

@Injectable({ providedIn: 'root' })

export class NotificationService {
    private notifaction: NotificationModel;
    private notifactionBS: Subject<NotificationModel> = new Subject<NotificationModel>();

    public getStateSubscription(): Observable<NotificationModel> {
        return this.notifactionBS.asObservable();
    }

    public next(notifaction: NotificationModel): void {
        this.notifaction = notifaction;
        this.notifactionBS.next(this.notifaction);
    }

    public dispatch(): void {
        this.sendNewStateToSubscribers();
    }

    private sendNewStateToSubscribers(): void {
        this.notifactionBS.next(this.notifaction);
    }
}
