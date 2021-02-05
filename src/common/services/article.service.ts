import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ArticleHelper } from '../helpers/article.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { ArticleModel } from '../models/article.model';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class ArticleService {
  constructor(private httpservice: HttpService) {}

  /**
   * Method loads data from fake API and returns typed ArticleModel items through the Observable object
   * @returns { Observable<ArticleModel[]> }
   * @async
   */
  public getPosts(listStart: string = '0', limit: string = '0', sortBy: string = 'human_id', sortDir: string = '1'): Observable<ArticleModel[]> {
    return this.httpservice.get<KeyValueInterface<any>[], ArticleModel[]>(
      `${environment.apiUrl}article`,
      {
        'listStart': listStart,
        'limit': limit,
        'sortBy': sortBy,
        'sortDir': sortDir
      },
      {},
      ArticleHelper.createArticleModelArray
    );
  }

  public getPost(id: string): Observable<ArticleModel> {
    return this.httpservice.get<KeyValueInterface<any>, ArticleModel>(
      `${environment.apiUrl}article/${id}`,
      {},
      {},
      ArticleHelper.createArticleModel
    );
  }

  public create(title: string, body: string): Observable<ArticleModel> {
    return this.httpservice.post<KeyValueInterface<any>, ArticleModel>(
      `${environment.apiUrl}article`,
      {
        'title': title,
        'body': body
      },
      {},
      (data: KeyValueInterface<any>): ArticleModel => ArticleHelper.createArticleModelFromServerData(data)
    );
  }

  public edit(title: string, body: string, id: string): Observable<ArticleModel> {
    return this.httpservice.post<KeyValueInterface<any>, ArticleModel>(
      `${environment.apiUrl}article/${id}`,
      {
        'title': title,
        'body': body,
        'id': id
      },
      {},
      (data: KeyValueInterface<any>): ArticleModel => ArticleHelper.createArticleModelFromServerData(data)
    );
  }

  public remove(id: string): Observable<KeyValueInterface<any>> {
    return this.httpservice.delete<KeyValueInterface<any>, KeyValueInterface<any>>(
      `${environment.apiUrl}article/${id}`,
      {},
      {
        'id': id
      }
    );
  }
}
