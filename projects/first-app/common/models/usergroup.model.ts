import { UsergroupInterface } from '../interfaces/usergroup.interface';

export class UsergroupModel implements UsergroupInterface {
    public usergroup_id: string;
    public title: string;
    public state: string;

    constructor(params: UsergroupInterface = {} as UsergroupInterface) {
        this.usergroup_id = params.usergroup_id;
        this.title = params.title;
        this.state = params.state;
    }
}
