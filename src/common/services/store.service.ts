import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ProductHelper } from '../helpers/product.helper';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { ProductModel } from '../models/product.model';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class StoreService {
    constructor(private httpservice: HttpService) {}

    public import(
        type: string,
        formData: FormData
    ): Observable<KeyValueInterface<any>> {
        return this.httpservice.post<KeyValueInterface<any>, ProductModel>(
            `${environment.apiUrl}storeimport/${type}`,
            formData,
            {},
            {
                'Content-type': 'multipart/form-data',
            },
            (data: KeyValueInterface<any>): ProductModel => ProductHelper.createProductModelFromServerData(data)
        );
    }
}
