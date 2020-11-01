import { Component, ElementRef, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '../../../common/models/product.model';
import { ProductService } from '../../../common/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { AuthenticationService } from '../../../common/services/authentication.service';
import { CartService } from '../../../common/services/cart.service';
import { CartproductModel } from '../../../common/models/cartproduct.model';
import { Subscription } from 'rxjs';
import { AttributevalueModel } from '../../../common/models/attributevalue.model';
import { ClonerService } from '../../../common/services/cloner.service';
import { environment } from '../../../environments/environment';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SEOService } from '../../../common/services/seo.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-product',
    templateUrl: 'product.component.html',
    styleUrls: ['product.component.scss']
})
export class ProductComponent implements OnDestroy, OnInit {
    @ViewChild( SwiperComponent, { read: false } ) public componentRef?: SwiperComponent;

    @ViewChild( SwiperDirective, { read: false } ) public directiveRef?: SwiperDirective;

    @ViewChild('template') public template: ElementRef;

    public mobile: boolean = false;
    public closeResult: string = '';
    public product_id: string;
    public product: ProductModel = new ProductModel;
    public productClone: ProductModel = new ProductModel;
    public faEdit = faEdit;
    public faTrashAlt = faTrashAlt;
    public isLoggedIn: boolean;
    public attributesRows: AttributevalueModel[] = [];
    public attributesSorted: AttributevalueModel[][] = [];
    public attrSelected: AttributevalueModel[] = [];
    public environment: KeyValueInterface<any> = environment;
    public popupContent: any;
    public show: boolean = true;
    public type: string = 'directive';
    public disabled: boolean = false;
    public slides: string[] = [];

    public config: SwiperConfigInterface = {
        a11y: true,
        direction: 'vertical',
        slidesPerView: 3,
        spaceBetween: 20,
        keyboard: true,
        mousewheel: true,
        scrollbar: false,
        navigation: true,
        pagination: false,
        speed: 1000,
        loop: true,
        centeredSlides: true,
        autoplay: false,
        initialSlide: 1,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 0
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            }
        }
    };

    private productSubscribe: Subscription;
    private productRemoveSubscribe: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private auth: AuthenticationService,
        private cartService: CartService,
        private clonerService: ClonerService,
        private seoService: SEOService,
        private modalService: NgbModal,
        private elRef: ElementRef
    ) {
        if (window.screen.width < 980) {
            this.mobile = true;
            this.config.direction = 'horizontal';
            this.config.autoplay = true;
        }

        this.isLoggedIn = this.auth.isLogged();

        this.route.params.subscribe(() => {
            this.getItem();
        });
    }

    public ngOnInit(): void {
        if (this.mobile === true) {
            this.type = 'component';
            const container: HTMLElement | null = this.elRef.nativeElement.querySelector('.component-container');
            if ( !!container ) {
                container.classList.add('mobile');
            }
        }
    }

    public openModalImg(event: HTMLInputEvent): void {
        this.popupContent = event.target;
        this.modalService.open(
            this.template,
            { size: 'lg' }
        );
    }

    public swClick(event: HTMLInputEvent): void {
        const src: string = event.target.dataset.full ? event.target.dataset.full : '';
        if (!!src) {
            const image = document.querySelector('.product-main-image') as HTMLImageElement;
            if ( !!image ) {
                image.src = src;
            }
        }
    }

    public changeAttribute(event: HTMLInputEvent): void {
        /*console.log('changeAttribute', event.target.dataset.index, event.target.parentNode);*/
        const parent: HTMLElement | null = event.target.parentNode as HTMLElement;
        const index: string = event.target.dataset.index ? event.target.dataset.index : '';
        const attrIdSelected: number = event.target.value ? Number(event.target.value) : Number(event.target.dataset.attrValueId);

        if (!!index) {
            const siblings = document.getElementsByClassName(`attr-group-${index}`);
            for (let i: number = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('active');
            }
        }
        if (!!parent) {
            parent.classList.add('active');
        }

        //console.log(attrIdSelected);
        for (const i of Object.keys(this.product.attributesSorted)) {
            for (const j of Object.keys(this.product.attributesSorted[i])) {
                if (this.product.attributesSorted[i][j]['attr_value_id'] === attrIdSelected) {
                    const selected: AttributevalueModel = this.product.attributesSorted[i][j];
                    /*console.log(selected);*/
                    if (!!selected) {
                        if (!!selected.child_product_id) {
                            this.router.navigate([`/products/${selected.child_product_id}`]);
                        } else {
                            this.product.price_calculated = this.productService.priceCalculate(this.productClone, selected);

                            if (Object.keys(this.attrSelected).length !== 0) {
                                for (const k of Object.keys(this.attrSelected)) {
                                    if (this.attrSelected[k]['attr_id'] === selected.attr_id) {
                                        this.attrSelected[k] = selected;
                                    } else {
                                        this.attrSelected.push(selected);
                                    }
                                }
                            } else {
                                this.attrSelected.push(selected);
                            }
                            /*this.attrSelected[selected.attr_id] = selected;*/
                        }

                        break;
                    }
                } else {
                    this.product.price_calculated = this.productClone.price;
                }
            }
        }
        /*console.log(this.productClone);*/
    }

    public getItem() {
        /*console.log('getItem');*/
        const routeParam: string | null = this.product_id ? this.product_id.toString() : this.route.snapshot.paramMap.get('id');
        if (typeof routeParam === 'string') {
            this.productSubscribe = this.productService.getProduct(routeParam).subscribe(
                (product: ProductModel): void => {
                    /*console.log(product);*/
                    this.product = product;
                    this.productClone = this.clonerService.deepClone(this.product);

                    if (!!this.product.meta_title) {
                        this.seoService.updateTitle(`${this.product.meta_title}`);
                    } else {
                        this.seoService.updateTitle(`${this.product.title}`);
                    }

                    if (!!this.product.meta_description) {
                        this.seoService.updateDescription(`${this.product.meta_description}`);
                    }

                    this.slides = [];
                    if (Object.keys(this.product.media).length > 1) {
                        for (const j of Object.keys(this.product.media)) {
                            if (!!this.product.media[j]['webp_full_image']) {
                                this.slides.push(`<img rel="preload" as="image" (click)="openModalImg($event)" class="slide-img" src="${this.environment.productImagesPath + this.product.media[j]['webp_thumb_image']}" data-full="${this.environment.productImagesPath + this.product.media[j]['webp_full_image']}" />`);
                            }
                        }
                    }
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
        this.productRemoveSubscribe = this.productService.remove(id.toString())
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

    public addToCart(product: ProductModel) {
        /*console.log(product);*/
        /*console.log(this.attrSelected);*/
        this.cartService.dispatch(
            new CartproductModel({
                product_id: product.product_id,
                title: product.title,
                price: product.price_calculated ? product.price_calculated : product.price,
                quantity: 1,
                media: product.media,
                attrSelected: this.attrSelected
            })
        );
    }

    public ngOnDestroy(): void {
        if (!!this.productSubscribe) {
            this.productSubscribe.unsubscribe();
        }
        if (!!this.productRemoveSubscribe) {
            this.productRemoveSubscribe.unsubscribe();
        }
    }
}