import { Component, Input, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { of } from 'rxjs/internal/observable/of';
import { ProductService } from '../../../common/services/product.service';
import { CartService } from '../../../common/services/cart.service';
import { PaginationParamsInterface } from '../../../common/interfaces/pagination-params.interface';
import { ProductModel } from '../../../common/models/product.model';
import { CartproductModel } from '../../../common/models/cartproduct.model';
import { Title } from '@angular/platform-browser';
import { faEdit, faTrashAlt, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { FilterComponent } from '../filter/filter.component';
import { WishlistService } from '../../../common/services/wishlist.service';
import { FilterService } from '../../../common/services/filter.service';
import { HttpErrorResponse } from '@angular/common/http';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { CategoryModel } from '../../../common/models/category.model';
import { CategoryService } from '../../../common/services/category.service';
import { environment } from '../../../environments/environment';
import { AttributevalueModel } from '../../../common/models/attributevalue.model';
import { LocalstorageService } from '../../../common/services/localstorage.service';

@Component({
    selector: 'app-products',
    styleUrls: ['products.component.css'],
    templateUrl: 'products.component.html'
})
export class ProductsComponent implements OnDestroy, OnInit  {
  @ViewChild(FilterComponent)
  public filterComponent: FilterComponent;

  @Input('ids')
  public set idsSetter(params: any) {
    if (!!params && params.length !== 0) {
      this.ids = params;
    }
  }

  @Input('showFilter')
  public set showFilterSetter(params: any) {
    if (params === true || params === false) {
      this.showFilter = params;
      console.log(this.showFilter);
    }
  }

  @Input('showCategoriesModule')
  public set showCategoriesModuleSetter(params: any) {
    if (params === true || params === false) {
      this.showCategoriesModule = params;
    }
  }

  public search: string | null;
  public type: string = 'front';
  public quckProduct: ProductModel | null;
  public filterParams: KeyValueInterface<any>;
  public category: CategoryModel;
  public showFilter: boolean = true;
  public showCategoriesModule: boolean = true;
  public page: string | null;
  public productSegment: ProductModel[];
  public startIndex: number = 0;
  public faEdit = faEdit;
  public faTrashAlt = faTrashAlt;
  public faCheckCircle = faCheckCircle;
  public faTimesCircle = faTimesCircle;
  public isLoggedIn: boolean;
  public sortBy: string = 'createdAt';
  public sortDir: string = '-1';
  public paginationParams: PaginationParamsInterface;
  public environment: KeyValueInterface<any> = environment;
  public langPrefix: string = '';
  private lang: string = 'en';
  private perPage: number = 9;
  private subscription: Subscription;
  private getitemscountsubscription: Subscription;
  private getitemssubscription: Subscription;
  private getpaginationparamsSubscription: Subscription;
  private getstateSubscription: Subscription;
  private wishlistSubscription: Subscription;
  private wishlistStateSubscription: Subscription;
  private typeSubscription: Subscription;
  private productRemoveSubscribe: Subscription;
  private ids: string[] = [];
  private wishlist: string[] = [];
  private filterSubscription: Subscription;
  private categoryStateSubscription: Subscription;
  private productSubscribe: Subscription;
  private varsPriceFrom: string;
  private varsPriceTo: string;
  private varsManufacturers: [] = [];
  private cid: string = '';
  private showModal: boolean;
  private state: string = '1';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private titleService: Title,
    private cartService: CartService,
    private auth: AuthenticationService,
    private wishlistService: WishlistService,
    private filterService: FilterService,
    private categoryService: CategoryService,
    private localStorageService: LocalstorageService
  ) {
    if (!!this.categoryStateSubscription) {
      this.categoryStateSubscription.unsubscribe();
    }
    this.categoryStateSubscription = this.categoryService.getCategoryStateSubscription().subscribe((category: CategoryModel): void => {
      if (!!category) {
        this.category = category;

        this.cid = this.category.cid;

        this.getItemsCount();
        this.getItems();
      }
    });

    this.titleService.setTitle(`Products`);

    this.lang = this.localStorageService.get('locale');
    switch (this.lang) {
        case 'en':
            this.langPrefix = '';
            break;

        case 'ru':
            this.langPrefix  = '/ru';
            break;
    }
  }

  public getWishlist() {
    if (!!this.wishlistSubscription) {
      this.wishlistSubscription.unsubscribe();
    }
    this.wishlistSubscription = this.wishlistService.getItems().subscribe((list: KeyValueInterface<any>): void => {
      this.wishlist = [];
      for (const i of Object.keys(list)) {
        this.wishlist.push(list[i]);
      }
      this.addWishlistToProducts();
    });
  }

  public getItems() {
    if (!!this.getitemssubscription) {
      this.getitemssubscription.unsubscribe();
    }

    this.getitemssubscription = this.productService.getProducts(
      this.startIndex.toString(),
      this.perPage.toString(),
      this.sortBy,
      this.sortDir,
      this.varsPriceFrom,
      this.varsPriceTo,
      this.varsManufacturers,
      this.cid,
      this.ids,
      this.state,
      this.search
    ).subscribe((products: ProductModel[]): void => {
      this.productSegment = products;
      this.productService.next(products, this.paginationParams);
      this.addWishlistToProducts();
    });
  }

  public getItemsCount() {
    if (!!this.getitemscountsubscription) {
      this.getitemscountsubscription.unsubscribe();
    }
    this.getitemscountsubscription = this.productService.getProductsCount(
      this.startIndex.toString(),
      '-1',
      this.sortBy,
      this.sortDir,
      this.varsPriceFrom,
      this.varsPriceTo,
      this.varsManufacturers,
      this.cid,
      this.ids,
      this.state,
      this.search
    ).subscribe((count: number): void => {
      this.paginationParams = { ... {
        total: count,
        perPage: this.perPage,
        current: this.paginationParams ? this.paginationParams.current : 1,
        controlsCount: 7
      }};
      this.productService.next(this.productSegment, this.paginationParams);
    });
  }

  public paginate(offset: number): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = of<number>(offset)
    .subscribe(
      (o: number): void => {
        this.startIndex = (Math.ceil(o) - 1) * this.paginationParams.perPage;
        this.paginationParams = { ... this.paginationParams, current: Math.ceil(o) };
        this.getItems();
        if (!!this.subscription) {
          this.subscription.unsubscribe();
        }
      }
    );
  }

  public changeSort(event: MouseEvent) {
    const target: HTMLElement | null = event.target as HTMLInputElement;
    const value: string | null = target.nodeValue === '' ? 'id' : target.nodeValue;
    if ( !!value ) {
      const sort: string[] = value.split('-');
      this.sortBy = sort[0];
      this.sortDir = sort[1];
      switch (this.sortDir) {
        case 'asc':
          this.sortDir = '1';
          break;
        case'desc':
          this.sortDir = '-1';
          break;
      }
      this.getItems();
    }
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

  public addWishlistToProducts(): void {
    if (!!this.productSegment) {
      const products: ProductModel[] = this.productSegment;
      for (const i of Object.keys(products)) {
        products[i]['wishlist'] = false;
        if (this.wishlist.includes(products[i]['product_id'].toString()) === true) {
          products[i]['wishlist'] = true;
        }
      }
    }
  }

  public addWishlist(product: ProductModel, event: MouseEvent) {
    const target: HTMLElement | null = event.target as HTMLInputElement;
    target.classList.add('pulse');
    if (!!this.wishlistSubscription) {
      this.wishlistSubscription.unsubscribe();
    }
    this.wishlistSubscription = this.wishlistService.add(product.product_id.toString()).subscribe(
      (list: KeyValueInterface<any>): void => {
        this.wishlist = [];
        for (const i of Object.keys(list)) {
          this.wishlist.push(list[i]);
        }
        if (this.ids.length !== 0) {
          this.getItems();
        }
        this.addWishlistToProducts();
      },
      (error: HttpErrorResponse): void => {
        console.error(error);
      }
    );
    setTimeout((): void => {
      target.classList.remove('pulse');
    }, 1000);
  }

  public ngOnInit() {
    if (!!this.typeSubscription) {
      this.typeSubscription.unsubscribe();
    }
    this.typeSubscription = this.route.data.subscribe((data: KeyValueInterface<any>) => {
      const lang: string = this.route.snapshot.params.lang;
      if (!!lang && (lang === 'en' || lang === 'ru')) {
        this.localStorageService.set('locale', lang);
      }
      if (!!data.type) {
        this.type = data.type;
        switch (this.type) {
          case 'front':
            this.state = '1';
            break;
          case 'administrator':
            this.state = '-1';
            break;
        }
      }
    });
    let page: number = !!this.route.snapshot.paramMap.get('page') ? Number(this.route.snapshot.paramMap.get('page')) : 1 ;
    const cid: string | null = this.route.snapshot.paramMap.get('id');
    if (cid !== null) {
      this.cid = cid;
    }
    if (page === null) {
      page = 1;
    } else {
      this.startIndex = page;
    }
    this.paginationParams = {
      total: 0,
      perPage: this.perPage,
      current: 1,
      controlsCount: 7
    };

    if (this.ids.length !== 0) {
      if (!!this.wishlistStateSubscription) {
        this.wishlistStateSubscription.unsubscribe();
      }
      this.wishlistStateSubscription = this.wishlistService.getStateSubscription().subscribe((list: KeyValueInterface<any>): void => {
        this.ids = [];
        for (const i of Object.keys(list)) {
          this.wishlist.push(list[i]);
          this.ids.push(list[i]);
        }
      });
    } else {
      this.getWishlist();
    }

    if (!!this.filterSubscription) {
      this.filterSubscription.unsubscribe();
    }
    this.filterSubscription = this.filterService.getStateSubscription().subscribe((filterparams: KeyValueInterface<any>): void => {
      if (filterparams.length !== 0) {
        this.varsPriceFrom = filterparams.varsPriceFrom;
        this.varsPriceTo = filterparams.varsPriceTo;
        this.varsManufacturers = filterparams.varsManufacturers;
        this.cid = filterparams.cid;
      }

      this.getItemsCount();
      this.getItems();
    });

    this.productSegment = [];

    this.isLoggedIn = this.auth.isLogged();
    if (!!this.getpaginationparamsSubscription) {
      this.getpaginationparamsSubscription.unsubscribe();
    }
    this.getpaginationparamsSubscription = this.productService.getPaginationParamsSubscription().subscribe((paginationParams: PaginationParamsInterface): void => {
      this.paginationParams = { ... paginationParams };
    });
    if (!!this.getstateSubscription) {
      this.getstateSubscription.unsubscribe();
    }
    this.getstateSubscription = this.productService.getStateSubscription().subscribe((products: ProductModel[]): void => {
      this.paginationParams = { ... {
        total: this.paginationParams.total,
        perPage: this.perPage,
        current: page ? page : this.paginationParams.current,
        controlsCount: 7
      }};
      this.productSegment = products;
    });
  }

  public quickPreview(product: ProductModel): void {
    this.quckProduct = product;
    this.ShowModal();
  }

  public ShowModal(): void {
    this.showModal = true;
    console.log(this.showModal);
  }

  public HideModal(): void {
    this.showModal = false;
    this.quckProduct = null;
    console.log(this.showModal);
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

  public searchByTitle(event: MouseEvent ): void {
    const target: HTMLElement | null = event.target as HTMLInputElement;
    this.search = target.nodeValue;
    this.getItemsCount();
    this.getItems();
  }

  public remove(id: number) {
    if (!!this.productRemoveSubscribe) {
      this.productRemoveSubscribe.unsubscribe();
    }
    this.productRemoveSubscribe = this.productService.remove(id.toString())
    .subscribe(
        (r: KeyValueInterface<any>): void => {
            console.log(r);
            this.getItemsCount();
            this.getItems();
            if (!!this.productRemoveSubscribe) {
              this.productRemoveSubscribe.unsubscribe();
            }
        },
        (error: HttpErrorResponse): void => {
            console.error(error);
        }
    );
  }

  public ngOnDestroy () {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }
    if (!!this.getitemscountsubscription) {
      this.getitemscountsubscription.unsubscribe();
    }
    if (!!this.getitemssubscription) {
      this.getitemssubscription.unsubscribe();
    }
    if (!!this.getpaginationparamsSubscription) {
      this.getpaginationparamsSubscription.unsubscribe();
    }
    if (!!this.getstateSubscription) {
      this.getstateSubscription.unsubscribe();
    }
    if (!!this.wishlistSubscription) {
      this.wishlistSubscription.unsubscribe();
    }
    if (!!this.wishlistStateSubscription) {
      this.wishlistStateSubscription.unsubscribe();
    }
    if (!!this.categoryStateSubscription) {
      this.categoryStateSubscription.unsubscribe();
    }
    if (!!this.productSubscribe) {
      this.productSubscribe.unsubscribe();
    }
    if (!!this.typeSubscription) {
      this.typeSubscription.unsubscribe();
    }
    if (!!this.productRemoveSubscribe) {
      this.productRemoveSubscribe.unsubscribe();
    }
  }
}
