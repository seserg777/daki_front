import { Injectable } from '@angular/core';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({ providedIn: 'root' })

export class FilterService {
    private filterBS: BehaviorSubject<KeyValueInterface<any>> = new BehaviorSubject<KeyValueInterface<any>>([]);
    private filterParams: KeyValueInterface<any> = [];

    public getStateSubscription(): Observable<KeyValueInterface<any>> {
        return this.filterBS.asObservable();
    }

    public next(filterParams: KeyValueInterface<any>): void {
        this.filterParams = filterParams;
        this.filterBS.next(this.filterParams);
    }
}
