import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { Observable } from 'rxjs';
import { SearchresultModel } from '../models/searchresult.model';
import { SearchHelper } from '../helpers/search.helper';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class SearchService {
    constructor(private httpservice: HttpService) {}

    public search(listStart: string = '0', limit: string = '0', sortBy: string = 'title', sortDir: string = '1', keyword: string): Observable<SearchresultModel[]> {
        return this.httpservice.get<KeyValueInterface<any>[], SearchresultModel[]>(
        `${environment.apiUrl}search`,
        {
            'listStart': listStart,
            'limit': limit,
            'sortBy': sortBy,
            'sortDir': sortDir,
            'keyword': keyword
        },
        {},
        SearchHelper.createSearchModelArray
        );
    }
}
