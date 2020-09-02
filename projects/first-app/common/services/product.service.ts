import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { ProductHelper } from '../helpers/product.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { ProductModel } from '../models/product.model';
import { HttpService } from './http.service';
import { PaginationParamsInterface } from '../interfaces/pagination-params.interface';
import { environment } from '../../environments/environment';
import { AttributevalueModel } from '../models/attributevalue.model';

@Injectable({ providedIn: 'root' })

export class ProductService {
  private products: ProductModel[] = [];
  private product: ProductModel;

  private paginationParams: PaginationParamsInterface = {
    total: 0,
    perPage: 9,
    current: 1,
    controlsCount: 7
  };

  private productsBS: Subject<ProductModel[]> = new Subject<ProductModel[]>();
  private productBS: Subject<ProductModel> = new Subject<ProductModel>();

  private paginationParamsBS: Subject<PaginationParamsInterface> = new Subject<PaginationParamsInterface>();

  constructor(private httpservice: HttpService) {}

  public getStateSubscription(): Observable<ProductModel[]> {
    return this.productsBS.asObservable();
  }

  public getProductStateSubscription(): Observable<ProductModel> {
    return this.productBS.asObservable();
  }

  public getPaginationParamsSubscription(): Observable<PaginationParamsInterface> {
    return this.paginationParamsBS.asObservable();
  }

  /**
  * Method saves given model and notifies subscribers about model changing
  * Method is private and shouldn't be called from the outside
  * @param products { ProductModel[] }
  * @returns { void }
  */
  public next(products: ProductModel[], paginationParams: PaginationParamsInterface): void {
    /*console.log('Productservice next');*/
    this.products = products;
    this.paginationParams = paginationParams;
    this.productsBS.next(this.products);
    this.paginationParamsBS.next(this.paginationParams);
  }

  public nextProduct(product: ProductModel): void {
    /*console.log('Productservice next');*/
    this.product = product;
    this.productBS.next(this.product);
  }

  /**
   * Method loads data from fake API and returns typed ProductModel items through the Observable object
   * @returns { Observable<ProductModel[]> }
   * @async
   */
  public getProducts(
    listStart: string = '0',
    limit: string = '0',
    sortBy: string = 'product_id',
    sortDir: string = '1',
    priceFrom: string = '0',
    priceTo: string = '-1',
    manufacturer: [],
    category_id: string = '0',
    ids: string[],
    state: string = '1'
  ): Observable<ProductModel[]> {
    return this.httpservice.get<KeyValueInterface<any>[], ProductModel[]>(
      `${environment.apiUrl}product`,
      {
        'listStart': listStart,
        'limit': limit,
        'sortBy': sortBy,
        'sortDir': sortDir,
        'priceFrom': priceFrom,
        'priceTo': priceTo,
        'manufacturer': manufacturer.toString(),
        'category_id': category_id,
        'ids': ids.toString(),
        'state': state
      },
      {},
      ProductHelper.createProductModelArray
    );
  }

    /**
   * Method loads data from fake API and returns typed ProductModel items through the Observable object
   * @returns { Observable<ProductModel[]> }
   * @async
   */
  public getProductsCount(
    listStart: string = '0',
    limit: string = '-1',
    sortBy: string = 'product_id',
    sortDir: string = '1',
    priceFrom: string = '0',
    priceTo: string = '-1',
    manufacturer: [],
    category_id: string = '0',
    ids: string[],
    state: string
  ): Observable<number> {
    return this.httpservice.get<number, number>(
      `${environment.apiUrl}product`,
      {
        'listStart': listStart,
        'limit': limit,
        'sortBy': sortBy,
        'sortDir': sortDir,
        'priceFrom': priceFrom,
        'priceTo': priceTo,
        'manufacturer': manufacturer.toString(),
        'category_id': category_id,
        'ids': ids.toString(),
        'state': state
      },
      {}/*,
      (data: number): number => data*/
    );
  }

  public getProduct(product_id: string): Observable<ProductModel> {
    return this.httpservice.get<KeyValueInterface<any>, ProductModel>(
      `${environment.apiUrl}product/${product_id}`,
      {},
      {},
      ProductHelper.createProductModel
    );
  }

  public create(
    title: string,
    short_description: string,
    description: string,
    price: string,
    manufacturer_id: number,
    category_id: number
  ): Observable<ProductModel> {
    return this.httpservice.post<KeyValueInterface<any>, ProductModel>(
      `${environment.apiUrl}product`,
      {
        'title': title,
        'short_description': short_description,
        'description': description,
        'price': price,
        'manufacturer_id': manufacturer_id,
        'category_id': category_id
      },
      {},
      (data: KeyValueInterface<any>): ProductModel => ProductHelper.createProductModelFromServerData(data)
    );
  }

  public edit(
    title: string,
    short_description: string,
    description: string,
    price: string,
    manufacturer_id: number,
    category_id: number,
    child_id: number,
    product_quantity: string,
    state: string,
    id: number,
    attributes: string,
    meta_title: string,
    meta_description: string
  ): Observable<ProductModel> {
    return this.httpservice.post<KeyValueInterface<any>, ProductModel>(
      `${environment.apiUrl}product/${id}`,
      {
        'title': title,
        'short_description': short_description,
        'description': description,
        'price': price,
        'manufacturer_id': manufacturer_id,
        'category_id': category_id,
        'child_id': child_id,
        'product_quantity': product_quantity,
        'state': state,
        'id': id,
        'attributes': attributes,
        'meta_title': meta_title,
        'meta_description': meta_description
      },
      {},
      (data: KeyValueInterface<any>): ProductModel => ProductHelper.createProductModelFromServerData(data)
    );
  }

  public media(
    id: number,
    formData: FormData
  ): Observable<ProductModel> {
    return this.httpservice.post<KeyValueInterface<any>, ProductModel>(
      `${environment.apiUrl}product/${id}/media`,
      formData,
      {},
      {
        'Content-type': 'multipart/form-data'
      },
      (data: KeyValueInterface<any>): ProductModel => ProductHelper.createProductModelFromServerData(data)
    );
  }

  public remove(id: string): Observable<KeyValueInterface<any>> {
    return this.httpservice.delete<KeyValueInterface<any>, KeyValueInterface<any>>(
      `${environment.apiUrl}product/${id}`,
      {},
      {
        'id': id
      }
    );
  }

  public priceCalculate(product: ProductModel, attrSelected: AttributevalueModel): number {
    /*console.log('start', product, attrSelected);*/

    if (!!attrSelected) {
      switch (attrSelected.price_modification) {
        case 1: {
          return product.price + Number(attrSelected.price);
          break;
        }
        case 2: {
          return product.price - Number(attrSelected.price);
          break;
        }
        case 3: {
          return Number(attrSelected.price);
          break;
        }
        case 4: {
          return product.price - Number(attrSelected.price * attrSelected.price);
          break;
        }
        case 5: {
          return product.price + Number(attrSelected.price * attrSelected.price);
          break;
        }
        default: {
          return product.price;
        }
      }
    } else {
      /*console.log('qq');*/
      return product.price;
    }
  }
}
