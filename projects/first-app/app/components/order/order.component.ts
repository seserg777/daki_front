import { Component   } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../common/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { OrdersService } from '../../../common/services/orders.service';
import { OrderModel } from '../../../common/models/order.model';

@Component({
    selector: 'app-order',
    templateUrl: 'order.component.html',
    styleUrls: ['order.component.css']
})
export class OrderComponent {
    public order: OrderModel = new OrderModel;
    public faEdit = faEdit;
    public faTrashAlt = faTrashAlt;
    public isLoggedIn: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private productService: ProductService,
        private auth: AuthenticationService,
        private ordersService: OrdersService
    ) {
        this.getItem();
        this.isLoggedIn = this.auth.isLogged();
    }

    public getItem() {
        const routeParam: string | null = this.route.snapshot.paramMap.get('id');
        if (typeof routeParam === 'string') {
            this.ordersService.getOrder(routeParam)
            .subscribe(
                (order: OrderModel): void => {
                    this.order = order;

                    this.titleService.setTitle(`Order #${this.order.order_id}`);
                },
                (error: HttpErrorResponse): void => {
                    if (error.error instanceof HttpErrorResponse && error.error.status === 404) {
                        this.router.navigate([`/404`]);
                    }
                }
            );
        }
    }

    public remove(id: number) {
        this.productService.remove(id.toString())
        .subscribe(
            (r: KeyValueInterface<any>): void => {
                console.log(r);
                this.router.navigate([`/products`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }
}
