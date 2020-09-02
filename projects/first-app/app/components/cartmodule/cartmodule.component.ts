import { Component, OnDestroy } from '@angular/core';
import { CartproductModel } from '../../../common/models/cartproduct.model';
import { CartService } from '../../../common/services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { OrderModel } from '../../../common/models/order.model';
import { OrderHelper } from '../../../common/helpers/order.helper';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { UserModel } from '../../../common/models/user.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cartmodule',
    styleUrls: ['cartmodule.component.css'],
    templateUrl: 'cartmodule.component.html'
})
export class CartmoduleComponent implements OnDestroy {
    public submitted: boolean = false;
    public cart: CartproductModel[] = [];
    public quantity: number = 0;
    public total: number = 0;
    public showModal: boolean;
    public order: OrderModel;
    public quickCart: FormGroup;
    public isLoggedIn: boolean;
    public user: UserModel;

    private checkoutSubscribe: Subscription;
    private cartSubscribe: Subscription;

    constructor(
        private cartService: CartService,
        private formBuilder: FormBuilder,
        private auth: AuthenticationService
    ) {
        this.cartSubscribe = this.cartService.getStateSubscription().subscribe(
            (cart: CartproductModel[]): void => {
                this.cart = cart;
                this.quantity = 0;

                this.reCalc();
                /*console.log(this.cart);*/
            }
        );

        this.auth.getStateSubscription().subscribe(
            (user: UserModel): void => {
                this.user = user;
            }
        );

        this.isLoggedIn = this.auth.isLogged();

        this.quickCart = this.formBuilder.group({
            email: ['', Validators.required]
        });

        if (this.isLoggedIn && this.user) {
            this.quickCart.controls['email'].setValue(this.user.email);
        }
    }

    public ShowModal(): void {
        this.showModal = true;
    }

    public HideModal(): void {
        this.showModal = false;
    }

    public toggleOffcanasCart(): void {
        const offcanvasCart: HTMLLIElement | null = document.querySelector('#offcanvas-cart');
        if (offcanvasCart) {
            offcanvasCart.classList.toggle('show');
        }
    }

    public clearCart(): void {
        this.cart = [];
        this.quantity = 0;
        this.total = 0;
        this.reCalc();
        this.cartService.next(this.cart);
        this.toggleOffcanasCart();
    }

    public removeFromCart(id: number): void {
        let index: number = 0;
        for (const i in this.cart) {
            if (this.cart.hasOwnProperty(i)) {
                if (Number(this.cart[i]['id']) === id) {
                    index = Number(i);
                }
            }
        }
        if (index) {
            this.cart.splice(index, 1);
        }
        this.reCalc();
    }

    public reCalc(): void {
        this.total = 0;
        for (const i in this.cart) {
            if (this.cart.hasOwnProperty(i)) {
                this.quantity = this.quantity + this.cart[i]['quantity'];
                this.total = this.total + (this.cart[i]['price'] * this.cart[i]['quantity']);
            }
        }
    }

    public get f(): KeyValueInterface<AbstractControl> {
        return this.quickCart.controls;
    }

    public onSubmit() {
        this.submitted = true;
        this.checkout();
    }

    public checkout(): void {
        if (!!this.checkoutSubscribe) {
            this.checkoutSubscribe.unsubscribe();
        }
        this.checkoutSubscribe = this.cartService.checkout(
            this.quickCart.value.email,
            this.cart,
            this.total
        ).subscribe(
            (r: KeyValueInterface<any>): void => {
                /*console.log(r);*/
                this.order = OrderHelper.createOrderModelFromServerData(r);
                if (this.order) {
                    this.quickCart.controls['email'].setValue('');
                }
                this.clearCart();
                this.ShowModal();
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }

    public ngOnDestroy () {
        if (!!this.checkoutSubscribe) {
            this.checkoutSubscribe.unsubscribe();
        }
        if (!!this.cartSubscribe) {
            this.cartSubscribe.unsubscribe();
        }
    }
}
