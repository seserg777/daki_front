import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { HttpService } from './http.service';
import { AuthenticationService } from './authentication.service';
import { LocalstorageService } from './localstorage.service';
import { UserModel } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class WishlistService {
    private list: KeyValueInterface<any> = [];
    private LSwishlist: BehaviorSubject<KeyValueInterface<any>> = new BehaviorSubject<KeyValueInterface<any>>([]);
    private logged: boolean;
    private user: UserModel;
    private subsription: Subscription;

    constructor(
        private httpservice: HttpService,
        private auth: AuthenticationService,
        private localctorageservice: LocalstorageService
    ) {
        this.logged = this.auth.isLogged();
        if (!!this.subsription) {
            this.subsription.unsubscribe();
        }
        this.subsription = this.auth.getStateSubscription().subscribe(( user: UserModel): void => {
            this.user = user;
        });
    }

    public next(list: KeyValueInterface<any>): void {
        this.list = list;
        this.LSwishlist.next(list);
    }

    public getStateSubscription(): Observable<KeyValueInterface<any>> {
        return this.LSwishlist.asObservable();
    }

    public getItems(): Observable<KeyValueInterface<any>> {
        if (this.logged === true) {
            return this.httpservice.get<any, any>(
                `${environment.apiUrl}wishlist/`,
                {
                    'email': this.user.email
                },
                {},
                (list: KeyValueInterface<any>): KeyValueInterface<any> => {
                    this.list = list;
                    this.LSwishlist.next(this.list);
                    return this.list;
                }
            );
            /*return of<KeyValueInterface<any>>();*/
        } else {
            const LSwishlist: string = this.localctorageservice.get('wishlist');
            this.list = LSwishlist !== '' ? JSON.parse(LSwishlist) : [];
            this.LSwishlist.next(this.list);
            return this.LSwishlist.asObservable();
        }
    }

    public add (product_id: string ): Observable<KeyValueInterface<any>> {
        if (this.logged === true) {
            return this.httpservice.post<KeyValueInterface<any>, KeyValueInterface<any>>(
                `${environment.apiUrl}wishlist/`,
                {
                    'product_id': product_id,
                    'email': this.user.email
                },
                {},
                {},
                (result: KeyValueInterface<any>): KeyValueInterface<any> => {
                    if (result) {
                        this.list.push(product_id);
                    } else {
                        const index: number = this.list.indexOf(product_id, 0);
                        if (index > -1) {
                            this.list.splice(index, 1);
                        }
                    }
                    this.next(this.list);
                    return this.list;
                }
            );
        } else {
            const LSwishlist: string = this.localctorageservice.get('wishlist');
            this.list = LSwishlist !== '' ? JSON.parse(LSwishlist) : [];
            if (this.list.includes(product_id) === false) {
                this.list.push(product_id);
                this.localctorageservice.set('wishlist', JSON.stringify(this.list));
            } else {
                const index: number = this.list.indexOf(product_id, 0);
                if (index > -1) {
                    this.list.splice(index, 1);
                }
                this.localctorageservice.set('wishlist', JSON.stringify(this.list));
            }
            this.LSwishlist.next(this.list);
            return this.LSwishlist.asObservable();
        }
    }
}
