import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ManufacturerHelper } from '../helpers/manufacturer.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { ManufacturerModel } from '../models/manufacturer.model';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class ManufacturerService {
  constructor(private httpservice: HttpService) {}

  /**
   * Method loads data from fake API and returns typed ManufacturerModel items through the Observable object
   * @returns { Observable<ManufacturerModel[]> }
   * @async
   */
  public getItems(listStart: string = '0', limit: string = '0', sortBy: string = 'manufacturer_id', sortDir: string = '1', cid: string = '0'): Observable<ManufacturerModel[]> {
    return this.httpservice.get<KeyValueInterface<any>[], ManufacturerModel[]>(
      `${environment.apiUrl}manufacturer`,
      {
        'listStart': listStart,
        'limit': limit,
        'sortBy': sortBy,
        'sortDir': sortDir,
        'cid': cid
      },
      {},
      ManufacturerHelper.createManufacturerModelArray
    );
  }

  public getItem(id: string): Observable<ManufacturerModel> {
    return this.httpservice.get<KeyValueInterface<any>, ManufacturerModel>(
      `${environment.apiUrl}manufacturer/${id}`,
      {},
      {},
      ManufacturerHelper.createManufacturerModel
    );
  }

  public create(title: string, short_description: string, description: string): Observable<ManufacturerModel> {
    return this.httpservice.post<KeyValueInterface<any>, ManufacturerModel>(
      `${environment.apiUrl}manufacturer`,
      {
        'title': title,
        'short_description': short_description,
        'description': description
      },
      {},
      (data: KeyValueInterface<any>): ManufacturerModel => ManufacturerHelper.createManufacturerModelFromServerData(data)
    );
  }

  public edit(manufacturer_id: number, title: string, short_description: string, description: string): Observable<ManufacturerModel> {
    return this.httpservice.post<KeyValueInterface<any>, ManufacturerModel>(
      `${environment.apiUrl}manufacturer/${manufacturer_id}`,
      {
          'manufacturer_id': manufacturer_id,
          'title': title,
          'short_description': short_description,
          'description': description
      },
      {},
      (data: KeyValueInterface<any>): ManufacturerModel => ManufacturerHelper.createManufacturerModelFromServerData(data)
    );
  }

  public remove(manufacturer_id: string): Observable<KeyValueInterface<any>> {
    return this.httpservice.delete<KeyValueInterface<any>, KeyValueInterface<any>>(
      `${environment.apiUrl}manufacturer/${manufacturer_id}`,
      {},
      {
        'manufacturer_id': manufacturer_id
      }
    );
  }
}
