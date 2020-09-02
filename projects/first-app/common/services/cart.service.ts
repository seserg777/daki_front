import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { CartproductModel } from '../../common/models/cartproduct.model';
import { KeyValueInterface } from '../interfaces/key-value.interface';
import { HttpService } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class CartService {
    constructor(private httpservice: HttpService) {}
    /**
    * Saved copy of user model. Won't be available from the outside.
    * All entities that require user model should get it via the onUserChange property over the subscription
    */
    private cart: CartproductModel[] = [];

    /**
    * Behavior subject for user property
    * @type { BehaviorSubject<CartproductModel[]> }
    */
    private cartBS: BehaviorSubject<CartproductModel[]> = new BehaviorSubject<CartproductModel[]>(this.cart);

    public getStateSubscription(): Observable<CartproductModel[]> {
        return this.cartBS.asObservable();
    }

    /**
    * Method saves given model and notifies subscribers about model changing
    * Method is private and shouldn't be called from the outside
    * @param cart { CartproductModel }
    * @returns { void }
    */
    public next(cart: CartproductModel[]): void {
        /*console.log('Cartervice next method', cart);*/
        // Saving new value
        this.cart = cart;

        // Sending update to subscribers via BehaviorSubject
        this.cartBS.next(this.cart);
    }

    public dispatch(product: CartproductModel): void {
        this.sendNewStateToSubscribers(product);
    }

    public productInCart(product: CartproductModel) {
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i]['product_id'] === product.product_id) {

                if (Object.keys(this.cart[i]['attrSelected']) !== Object.keys(product.attrSelected)) {
                    return false;
                }

                return i;
            }
        }

        return false;
    }

    public addProduct(product: CartproductModel) {
        const exist: number | boolean = this.productInCart(product);
        if (product.quantity > 0) {
            if (exist === false) {
                this.cart.push(product);
            } else {
                this.cart[exist]['quantity'] += product.quantity;
            }
            this.cartBS.next(this.cart);
        } else {
            if (product.quantity === 0) {
                this.cart.splice(+ exist, 1);
                this.cartBS.next(this.cart);
            }
        }

        /*console.log(product);
        console.log(this.cart);*/
    }

    public checkout(
        user_email: string,
        cart: CartproductModel[],
        total: number
    ): Observable<KeyValueInterface<any>> {
        return this.httpservice.post<KeyValueInterface<any>, KeyValueInterface<any>>(
            `${environment.apiUrl}checkout`,
            {
                'user_email': user_email,
                'items': cart,
                'summ': total
            },
            {},
            (data: KeyValueInterface<any>): void => console.log(data)
        );
    }

    private sendNewStateToSubscribers(product: CartproductModel): void {
        this.addProduct(product);
        this.cartBS.next(this.cart);
    }
}
