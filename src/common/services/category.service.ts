import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CategoryHelper } from '../helpers/category.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { CategoryModel } from '../models/category.model';
import { HttpService } from './http.service';
import { Subject } from 'rxjs/internal/Subject';
import { CategoryformoduleModel } from '../models/categoryformodule.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class CategoryService {
  private categories: CategoryModel[] = [];
  private category: CategoryModel;
  private categoriesBS: Subject<CategoryModel[]> = new Subject<CategoryModel[]>();
  private categoryBS: Subject<CategoryModel> = new Subject<CategoryModel>();

  constructor(private httpservice: HttpService) {}

  public getStateSubscription(): Observable<CategoryModel[]> {
    /*console.log('getStateSubscription');*/
    return this.categoriesBS.asObservable();
  }

  public getCategoryStateSubscription(): Observable<CategoryModel> {
    /*console.log('getStateSubscription');*/
    return this.categoryBS.asObservable();
  }

  public categoryNext(category: CategoryModel): void {
    /*console.log('CategoryService categoryNext', category);*/
    this.category = category;
    this.categoryBS.next(this.category);
  }

  public next(categories: CategoryModel[]): void {
    console.log('CategoryService next', categories);
    this.categories = categories;
    this.categoriesBS.next(this.categories);
  }

  public getCategoriesCount(): Observable<number> {
    /*console.log('getCategoriesCount');*/
    return this.httpservice.get<number, number>(
      `${environment.apiUrl}categories`,
      {
        'listStart': '0',
        'limit': '-1'
      },
      {},
      (data: number): number => data
    );
  }

  /**
   * Method loads data from fake API and returns typed categoryModel items through the Observable object
   * @returns { Observable<categoryModel[]> }
   * @async
   */
  public getCategories(
    listStart: string = '0',
    limit: string = '0',
    sortBy: string = 'cid',
    sortDir: string = '1',
    parent: string = '0'
  ): Observable<CategoryModel[]> {
    return this.httpservice.get<KeyValueInterface<any>[], CategoryModel[]>(
      `${environment.apiUrl}categories`,
      {
        'listStart': listStart,
        'limit': limit,
        'sortBy': sortBy,
        'sortDir': sortDir,
        'parent': parent
      },
      {},
      CategoryHelper.createCategoryModelArray
    );
  }

  public getCategoriesforModule(): Observable<CategoryformoduleModel[]> {
    return this.httpservice.get<KeyValueInterface<any>[], CategoryformoduleModel[]>(
      `${environment.apiUrl}categories/list`,
      {},
      {},
      CategoryHelper.createCategoryformoduleModelArray
    )
  }

  public getCategory(id: string): Observable<CategoryModel> {
    return this.httpservice.get<KeyValueInterface<any>, CategoryModel>(
      `${environment.apiUrl}categories/${id}`,
      {},
      {},
      CategoryHelper.createCategoryModel
    );
  }

  public create(title: string, extension: string = 'article', parent: string = 'root'): Observable<CategoryModel> {
    return this.httpservice.post<KeyValueInterface<any>, CategoryModel>(
      `${environment.apiUrl}categories`,
      {
        'title': title,
        'parent': parent,
        'extension': extension
      },
      {},
      (data: KeyValueInterface<any>): CategoryModel => CategoryHelper.createCategoryModelFromServerData(data)
    );
  }

  public edit(id: string, title: string, extension: string = 'article', parent: string = 'root'): Observable<CategoryModel> {
    return this.httpservice.post<KeyValueInterface<any>, CategoryModel>(
      `${environment.apiUrl}categories/${id}`,
      {
        'title': title,
        'parent': parent,
        'extension': extension
      },
      {},
      (data: KeyValueInterface<any>): CategoryModel => CategoryHelper.createCategoryModelFromServerData(data)
    );
  }

  public remove(id: string): Observable<KeyValueInterface<any>> {
    return this.httpservice.delete<KeyValueInterface<any>, KeyValueInterface<any>>(
      `${environment.apiUrl}categories/${id}`,
      {},
      {
        'id': id
      }
    );
  }
}
