import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserHelper } from '../helpers/user.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { UserModel } from '../models/user.model';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class UserService {
  constructor(private httpservice: HttpService) {}

  /**
   * Method loads data from fake API and returns typed ArticleModel items through the Observable object
   * @returns { Observable<ArticleModel[]> }
   * @async
   */
  public getUsers(listStart: string = '0', limit: string = '0', sortBy: string = 'name', sortDir: string = '1'): Observable<UserModel[]> {
    return this.httpservice.get<KeyValueInterface<any>[], UserModel[]>(
      `${environment.apiUrl}user`,
      {
        'listStart': listStart,
        'limit': limit,
        'sortBy': sortBy,
        'sortDir': sortDir
      },
      {},
      UserHelper.createUserModelArray
    );
  }

  public getUser(id: string): Observable<UserModel> {
    return this.httpservice.get<KeyValueInterface<any>, UserModel>(
      `${environment.apiUrl}user/${id}`,
      {},
      {},
      UserHelper.createUserModel
    );
  }

  public create(title: string, body: string): Observable<UserModel> {
    return this.httpservice.post<KeyValueInterface<any>, UserModel>(
      `${environment.apiUrl}user`,
      {
        'title': title,
        'body': body
      },
      {},
      (data: KeyValueInterface<any>): UserModel => UserHelper.createUserModelFromServerData(data)
    );
  }

  public edit(id: string, name: string, email: string): Observable<UserModel> {
    return this.httpservice.post<KeyValueInterface<any>, UserModel>(
      `${environment.apiUrl}user/${id}`,
      {
        'name': name,
        'email': email
      },
      {},
      (data: KeyValueInterface<any>): UserModel => UserHelper.createUserModelFromServerData(data)
    );
  }

  public media(
    id: string,
    formData: FormData
  ): Observable<UserModel> {
    return this.httpservice.post<KeyValueInterface<any>, UserModel>(
      `${environment.apiUrl}user/${id}/media`,
      formData,
      {},
      {
        'Content-type': 'multipart/form-data'
      },
      (data: KeyValueInterface<any>): UserModel => UserHelper.createUserModelFromServerData(data)
    );
  }

  public remove(id: string): Observable<KeyValueInterface<any>> {
    return this.httpservice.delete<KeyValueInterface<any>, KeyValueInterface<any>>(
      `${environment.apiUrl}user/${id}`,
      {},
      {
        'id': id
      }
    );
  }
}
