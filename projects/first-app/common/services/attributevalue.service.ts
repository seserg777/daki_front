import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { AttributevalueModel } from '../models/attributevalue.model';
import { HttpService } from './http.service';
import { AttributevalueHelper } from '../helpers/attributevalue.helper';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AttributevalueService {
  constructor(private httpservice: HttpService) {}

  public getItems(
    listStart: string = '0',
    limit: string = '0',
    sortBy: string = 'attr_id',
    sortDir: string = '1',
    attr_id: string,
    product_id: string
  ): Observable<AttributevalueModel[]> {
    return this.httpservice.get<KeyValueInterface<any>[], AttributevalueModel[]>(
      `${environment.apiUrl}attributevalue`,
      {
        'listStart': listStart,
        'limit': limit,
        'sortBy': sortBy,
        'sortDir': sortDir,
        'attr_id': attr_id,
        'product_id': product_id
      },
      {},
      AttributevalueHelper.createAttributevalueModelArray
    );
  }
}