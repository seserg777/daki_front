import { KeyValueInterface } from '../interfaces/key-value.interface';
import { SearchresultModel } from '../models/searchresult.model';

export class SearchHelper {
    public static createSearchModelArray(data: any[]): SearchresultModel[] {
        return data.map((item: KeyValueInterface<any>): SearchresultModel => SearchHelper.createSearchModel(item));
    }

    public static createSearchModel(data: KeyValueInterface<any> = {}): SearchresultModel {
        return new SearchresultModel({
            id: data.id,
            title: data.title,
            type: data.type,
            image: data.image
        });
    }
}
