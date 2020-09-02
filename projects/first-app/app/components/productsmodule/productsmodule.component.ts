import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProductService } from '../../../common/services/product.service';
import { CartService } from '../../../common/services/cart.service';
import { ProductModel } from '../../../common/models/product.model';
import { CartproductModel } from '../../../common/models/cartproduct.model';
import { environment } from '../../../environments/environment';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';

@Component({
    selector: 'app-productsmodule',
    styleUrls: ['productsmodule.component.css'],
    templateUrl: 'productsmodule.component.html'
})
export class ProductsmoduleComponent implements OnDestroy {
  public environment: KeyValueInterface<any> = environment;
  public productSegment: ProductModel[];
  private getitemssubscription: Subscription;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.getItems();
  }

  public getItems() {
    if (!!this.getitemssubscription) {
      this.getitemssubscription.unsubscribe();
    }
    this.getitemssubscription = this.productService.getProducts(
      '1',
      '4',
      'hits',
      '-1',
      '0',
      '0',
      [],
      '',
      [],
      '1'
    ).subscribe((products: ProductModel[]): void => {
      console.log(products);
      this.productSegment = products;
    });
  }

  public addToCart(product: ProductModel) {
    this.cartService.dispatch(
      new CartproductModel({
        product_id: product.product_id,
        title: product.title,
        price: product.price,
        media: product.media,
        quantity: 1,
        attrSelected: []
      })
    );
  }

  public ngOnDestroy () {
    if (!!this.getitemssubscription) {
      this.getitemssubscription.unsubscribe();
    }
  }
}
