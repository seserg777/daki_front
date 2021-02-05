import { SearchresultInterface } from '../interfaces/searchresult.interface';

export class SearchresultModel implements SearchresultInterface {
    public id: number;
    public title: string;
    public type: string;
    public image: string;

    constructor(params: SearchresultInterface = {} as SearchresultInterface) {
        this.id = params.id;
        this.title = params.title;
        this.type = params.type;
        this.image = params.image;
    }
}
