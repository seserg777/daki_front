import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/internal/Observable';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { MediaHelper } from '../helpers/media.helper';
import { MediaModel } from '../models/media.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class MediaService {
    constructor(private httpservice: HttpService) {}
    public getItems(
        type: string = 'product',
        listStart: string = '0',
        limit: string = '0',
        sortBy: string = 'id',
        sortDir: string = '1'
    ): Observable<MediaModel[]> {
        return this.httpservice.get<KeyValueInterface<any>[], MediaModel[]>(
          `${environment.apiUrl}media`,
          {
            'type': type,
            'listStart': listStart,
            'limit': limit,
            'sortBy': sortBy,
            'sortDir': sortDir
          },
          {},
          MediaHelper.createModelArray
        );
    }
}
