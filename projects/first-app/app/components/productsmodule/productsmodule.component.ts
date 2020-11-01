import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProductService } from '../../../common/services/product.service';
import { CartService } from '../../../common/services/cart.service';
import { ProductModel } from '../../../common/models/product.model';
import { CartproductModel } from '../../../common/models/cartproduct.model';
import { environment } from '../../../environments/environment';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface, SwiperScrollbarInterface, SwiperPaginationInterface, SwiperAutoplayInterface } from 'ngx-swiper-wrapper';
import { AttributevalueModel } from '../../../common/models/attributevalue.model';
import { Router } from '@angular/router';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-productsmodule',
    styleUrls: ['productsmodule.component.css'],
    templateUrl: 'productsmodule.component.html'
})
export class ProductsmoduleComponent implements OnDestroy {
  @ViewChild( SwiperComponent, { read: false } ) public componentRef?: SwiperComponent;

  @ViewChild( SwiperDirective, { read: false } ) public directiveRef?: SwiperDirective;

  public mobile: boolean = false;
  public faShoppingBasket = faShoppingBasket;
  public environment: KeyValueInterface<any> = environment;
  public productSegment: ProductModel[];

  public disabled: boolean = false;
  public type: string =  'directive';

  public autoplay: SwiperAutoplayInterface = {
    delay: 0,
    disableOnInteraction: true
  };

  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 5,
    keyboard: true,
    mousewheel: true,
    scrollbar: false,
    navigation: true,
    pagination: false,
    speed: 1000,
    loop: false,
    //autoplay: this.autoplay,
    autoplay: false,
    spaceBetween: 20,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 0
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      980: {
        slidesPerView: 3,
        spaceBetween: 30
      }
    }
  };

  private scrollbar: SwiperScrollbarInterface = {
      el: '.swiper-scrollbar',
      hide: false,
      draggable: true
  };

  private pagination: SwiperPaginationInterface = {
      el: '.swiper-pagination',
      clickable: true,
      hideOnClick: false
  };

  private getitemssubscription: Subscription;
  private productSubscribe: Subscription;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
    if (window.screen.width < 980) {
      this.mobile = true;
      this.config.autoplay = true;
    }

    this.getItems();
  }

  public getItems() {
    if (!!this.getitemssubscription) {
      this.getitemssubscription.unsubscribe();
    }
    this.getitemssubscription = this.productService.getProducts(
      '1',
      '10',
      'hits',
      '-1',
      '0',
      '0',
      [],
      '2355',
      [],
      '1',
      ''
    ).subscribe((products: ProductModel[]): void => {
      this.productSegment = products;
      this.disabled = false;
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

  public toggleDisabled(): void {
      this.disabled = !this.disabled;
  }

  public toggleDirection(): void {
      this.config.direction = (this.config.direction === 'horizontal') ? 'vertical' : 'horizontal';
  }

  public toggleSlidesPerView(): void {
      if (this.config.slidesPerView !== 1) {
      this.config.slidesPerView = 1;
      } else {
      this.config.slidesPerView = 2;
      }
  }

  public toggleOverlayControls(): void {
      if (this.config.navigation) {
      this.config.scrollbar = false;
      this.config.navigation = false;

      this.config.pagination = this.pagination;
      } else if (this.config.pagination) {
      this.config.navigation = false;
      this.config.pagination = false;

      this.config.scrollbar = this.scrollbar;
      } else {
      this.config.scrollbar = false;
      this.config.pagination = false;

      this.config.navigation = true;
      }

      if (this.type === 'directive' && this.directiveRef) {
        this.directiveRef.setIndex(0);
      } else if (this.type === 'component' && this.componentRef && this.componentRef.directiveRef) {
        this.componentRef.directiveRef.setIndex(0);
      }
  }

  public toggleKeyboardControl(): void {
      this.config.keyboard = !this.config.keyboard;
  }

  public toggleMouseWheelControl(): void {
      this.config.mousewheel = !this.config.mousewheel;
  }

  public changeAttribute(attribute: AttributevalueModel): void {
    if (!!attribute.child_product_id) {
      this.productSubscribe = this.productService.getProduct(attribute.child_product_id.toString()).subscribe(
        (product: ProductModel): void => {
          for (const i of Object.keys(this.productSegment)) {
            if (this.productSegment[i]['product_id'].toString() === attribute.product_id.toString()) {
              this.productSegment[i] = product;
            }
          }
        }
      );
    }

    if (!!attribute.price && !!attribute.price_modification) {
        for (const k of Object.keys(this.productSegment)) {
            if (this.productSegment[k]['product_id'] === attribute.product_id) {
              this.productSegment[k]['price_calculated'] = this.productService.priceCalculate(this.productSegment[k], attribute);
            }
        }
    }
  }

  public gotToProduct (product_id: string): void {
    this.router.navigate([`/products/${product_id}`]);
  }

  public ngOnDestroy () {
    if (!!this.getitemssubscription) {
      this.getitemssubscription.unsubscribe();
    }
    if (!!this.productSubscribe) {
      this.productSubscribe.unsubscribe();
    }
  }
}
