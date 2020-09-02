import { UsergroupInterface } from './usergroup.interface';

export interface UserInterface {
    id: string;
    email: string;
    name: string;
    exp: number;
    iat: number;
    groups: UsergroupInterface[];
}
