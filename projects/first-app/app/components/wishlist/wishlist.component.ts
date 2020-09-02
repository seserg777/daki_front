import { Component, OnInit, OnDestroy } from '@angular/core';
import { WishlistService } from '../../../common/services/wishlist.service';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-wishlist',
    styleUrls: ['wishlist.component.css'],
    templateUrl: 'wishlist.component.html'
})
export class WishlistComponent implements OnInit, OnDestroy {
    public list: KeyValueInterface<any> = [];
    private wishlistItemsSubscription: Subscription;
    private wishlistStateSubscription: Subscription;

    constructor (private wishlistService: WishlistService) {
        if (!!this.wishlistItemsSubscription) {
            this.wishlistItemsSubscription.unsubscribe();
        }
        this.wishlistItemsSubscription = this.wishlistService.getItems().subscribe((list: KeyValueInterface<any>): void => {
            this.list = list;
        });
    }

    public ngOnInit() {
        if (!!this.wishlistStateSubscription) {
            this.wishlistStateSubscription.unsubscribe();
        }
        this.wishlistStateSubscription = this.wishlistService.getStateSubscription().subscribe((list: KeyValueInterface<any>): void => {
            this.list = list;
        });
    }

    public ngOnDestroy() {
        if (!!this.wishlistItemsSubscription) {
            this.wishlistItemsSubscription.unsubscribe();
        }
        if (!!this.wishlistStateSubscription) {
            this.wishlistStateSubscription.unsubscribe();
        }
    }
}
