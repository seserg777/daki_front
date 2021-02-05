import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { AttributeModel } from '../models/attribute.model';
import { HttpService } from './http.service';
import { AttributeHelper } from '../helpers/attribute.helper';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AttributeService {
  constructor(private httpservice: HttpService) {}

  public getItem(id: string): Observable<AttributeModel> {
    return this.httpservice.get<KeyValueInterface<any>[], AttributeModel>(
      `${environment.apiUrl}attribute/${id}`,
      {},
      {},
      AttributeHelper.createAttributeModel
    );
  }

  public getItems(listStart: string = '0', limit: string = '0', sortBy: string = 'attr_id', sortDir: string = '1'): Observable<AttributeModel[]> {
    return this.httpservice.get<KeyValueInterface<any>[], AttributeModel[]>(
      `${environment.apiUrl}attribute`,
      {
        'listStart': listStart,
        'limit': limit,
        'sortBy': sortBy,
        'sortDir': sortDir
      },
      {},
      AttributeHelper.createAttributeModelArray
    );
  }

  public create(attr_id: number, type: number, title: string, show_title: boolean, image: string): Observable<AttributeModel> {
    return this.httpservice.post<KeyValueInterface<any>, AttributeModel>(
      `${environment.apiUrl}attribute`,
      {
        'attr_id': attr_id,
        'type': type,
        'title': title,
        'show_title': show_title,
        'image': image
      },
      {},
      (data: KeyValueInterface<any>): AttributeModel => AttributeHelper.createAttributeModelFromServerData(data)
    );
  }
}
