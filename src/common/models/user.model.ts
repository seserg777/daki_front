import { UserInterface } from '../interfaces/user.interface';
import { UsergroupInterface } from '../interfaces/usergroup.interface';

export class UserModel implements UserInterface {
    public email: string;
    public name: string;
    public exp: number;
    public iat: number;
    public id: string;
    public groups: UsergroupInterface[];

    constructor(params: UserInterface = {} as UserInterface) {
        this.email = params.email;
        this.name = params.name;
        this.exp = params.exp;
        this.iat = params.iat;
        this.id = params.id;
        this.groups = params.groups;
    }
}
