import { Component, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationModel } from '../../../common/models/notification.model';
import { NotificationService } from '../../../common/services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: 'notification.component.html',
    styleUrls: ['notification.component.scss']
})
export class NotificationComponent implements OnDestroy {
    public class: string = 'notification';
    public notification: NotificationModel;
    private notificationSubscribe: Subscription;

    constructor(private notificationService: NotificationService) {
        if (!!this.notificationSubscribe) {
            this.notificationSubscribe.unsubscribe();
        }
        this.notificationSubscribe = this.notificationService.getStateSubscription().subscribe((notification: NotificationModel): void => {
            this.notification = notification;
            this.getNotificationClass();
            setTimeout(() => {
                this.class = 'notification';
            }, 2000);
        });
    }

    public getNotificationClass(): void {
        if (!!this.notification) {
            this.class =  `notification ${this.notification.type} active`;
        }
    }

    public ngOnDestroy(): void {
        if (!!this.notificationSubscribe) {
            this.notificationSubscribe.unsubscribe();
        }
    }
}
