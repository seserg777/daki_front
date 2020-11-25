import { NotoficationInterface } from '../interfaces/notification.interface';

export class NotificationModel implements NotoficationInterface {
    public type: string;
    public msg: string;

    constructor(params: NotoficationInterface = {} as NotoficationInterface) {
        this.type = params.type;
        this.msg = params.msg;
    }
}
