import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UsergroupHelper } from '../helpers/usergroup.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { UsergroupModel } from '../models/usergroup.model';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class UsergroupService {
  constructor(private httpservice: HttpService) {}

  /**
   * Method loads data from fake API and returns typed ArticleModel items through the Observable object
   * @returns { Observable<ArticleModel[]> }
   * @async
   */
  public getUsergroups(listStart: string = '0', limit: string = '0', sortBy: string = 'name', sortDir: string = '1'): Observable<UsergroupModel[]> {
    return this.httpservice.get<KeyValueInterface<any>[], UsergroupModel[]>(
      `${environment.apiUrl}usergroup`,
      {
        'listStart': listStart,
        'limit': limit,
        'sortBy': sortBy,
        'sortDir': sortDir
      },
      {},
      UsergroupHelper.createUsergroupModelArray
    );
  }

  public getUsergroup(id: string): Observable<UsergroupModel> {
    return this.httpservice.get<KeyValueInterface<any>, UsergroupModel>(
      `${environment.apiUrl}usergroup/${id}`,
      {},
      {},
      UsergroupHelper.createUsergroupModel
    );
  }

  public create(title: string, body: string): Observable<UsergroupModel> {
    return this.httpservice.post<KeyValueInterface<any>, UsergroupModel>(
      `${environment.apiUrl}usergroup`,
      {
        'title': title,
        'body': body
      },
      {},
      (data: KeyValueInterface<any>): UsergroupModel => UsergroupHelper.createUsergroupModelFromServerData(data)
    );
  }

  public edit(id: string, name: string, email: string): Observable<UsergroupModel> {
    return this.httpservice.post<KeyValueInterface<any>, UsergroupModel>(
      `${environment.apiUrl}usergroup/${id}`,
      {
        'name': name,
        'email': email
      },
      {},
      (data: KeyValueInterface<any>): UsergroupModel => UsergroupHelper.createUsergroupModelFromServerData(data)
    );
  }

  public remove(id: string): Observable<KeyValueInterface<any>> {
    return this.httpservice.delete<KeyValueInterface<any>, KeyValueInterface<any>>(
      `${environment.apiUrl}usergroup/${id}`,
      {},
      {
        'id': id
      }
    );
  }
}
