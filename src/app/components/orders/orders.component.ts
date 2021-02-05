import { Component } from '@angular/core';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { Title } from '@angular/platform-browser';
import { OrdersService } from '../../../common/services/orders.service';
import { OrderModel } from '../../../common/models/order.model';
import { PaginationParamsInterface } from '../../../common/interfaces/pagination-params.interface';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-orders',
    styleUrls: ['orders.component.css'],
    templateUrl: 'orders.component.html'
})
export class OrdersComponent {
    public isLoggedIn: boolean;

    public ordersSegment: OrderModel[];

    public paginationParams: PaginationParamsInterface;

    private orders: OrderModel[];

    private perPage: number = 5;

    private subscription: Subscription;

    constructor(
        private ordersService: OrdersService,
        private auth: AuthenticationService,
        private titleService: Title
    ) {
        this.isLoggedIn = this.auth.isLogged();

        this.ordersService.getOrders().subscribe((orders: OrderModel[]): void => {
            this.orders = orders;
            this.paginationParams = {
              total: orders.length,
              perPage: this.perPage,
              current: 1,
              controlsCount: 7
            };
            this.ordersSegment = orders.slice(0, 5);
        });

        this.titleService.setTitle(`Orders`);
    }

    public getOrders(offset: number): void {
        if (!!this.subscription) {
          this.subscription.unsubscribe();
        }

        this.subscription = of<number>(offset)
        .pipe<number>(delay<number>(2000))
        .subscribe(
          (o: number): void => {
              const startIndex: number = (o - 1) * this.paginationParams.perPage;
              this.paginationParams = { ... this.paginationParams, current: o };
              this.ordersSegment = this.orders.slice(startIndex, startIndex + this.paginationParams.perPage);
              this.subscription.unsubscribe();
          }
        );
    }
}
