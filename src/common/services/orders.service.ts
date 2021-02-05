import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { HttpService } from './http.service';
import { OrderModel } from '../models/order.model';
import { OrderHelper } from '../helpers/order.helper';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class OrdersService {
  constructor(private httpservice: HttpService) {}

  public getOrders(listStart: string = '0', limit: string = '0', sortBy: string = 'human_id', sortDir: string = '1'): Observable<OrderModel[]> {
    return this.httpservice.get<KeyValueInterface<any>[], OrderModel[]>(
      `${environment.apiUrl}orders`,
      {
        'listStart': listStart,
        'limit': limit,
        'sortBy': sortBy,
        'sortDir': sortDir
      },
      {},
      OrderHelper.createOrderModelArray
    );
  }

  public getOrder(id: string): Observable<OrderModel> {
    return this.httpservice.get<KeyValueInterface<any>, OrderModel>(
      `${environment.apiUrl}orders/${id}`,
      {},
      {},
      OrderHelper.createOrderModelFromServerData
    );
  }
}
