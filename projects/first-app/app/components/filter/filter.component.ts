import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ProductService } from '../../../common/services/product.service';
import { ProductModel } from '../../../common/models/product.model';
import { PaginationParamsInterface } from '../../../common/interfaces/pagination-params.interface';
import { ManufacturerModel } from '../../../common/models/manufacturer.model';
import { ManufacturerService } from '../../../common/services/manufacturer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { FilterService } from '../../../common/services/filter.service';

@Component({
    selector: 'app-filter',
    styleUrls: ['filter.component.css'],
    templateUrl: 'filter.component.html'
})
export class FilterComponent implements OnDestroy {
    @Input('params')
    public set paramsSetter(params: any) {
        /* console.log('FilterComponent paramsSetter'); */
        /* console.log(params, Object.keys(params), params.category); */
        if (!!params && typeof params.category !== 'undefined') {
            /* console.log('FilterComponent paramsSetter will done'); */
            this.params = params;
            /*console.log('Filter paramsSetter', this.params);*/
            this.getProducts();
        }
    }

    public productSegment: ProductModel[];
    public params: any = {};
    public paginationParams: PaginationParamsInterface;
    public manufacturers: ManufacturerModel[] = [];
    public varsManufacturers: [] = [];
    public filterForm: FormGroup;

    public varsPriceFrom: string = '0';
    public varsPriceTo: string = '-1';

    private cid: string = '';

    private cidSubscription: Subscription;
    private getpaginationparamsSubscription: Subscription;
    private subscription: Subscription;
    private onchangeSubscription: Subscription;
    private getproductsSubscription: Subscription;
    private getitemscountSubscription: Subscription;
    private getmanufacturersSubscribe: Subscription;

    private spoilerManufacturersShow: boolean = false;

    constructor(
        private productService: ProductService,
        private manufacturerService: ManufacturerService,
        private router: Router,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private filterService: FilterService
    ) {
        /* console.log('FilterComponent constructor'); */
        this.getpaginationparamsSubscription = this.productService.getPaginationParamsSubscription().subscribe((paginationParams: PaginationParamsInterface): void => {
            this.paginationParams = { ... paginationParams };
            /*console.log('FilterComponent getPaginationParamsSubscription', this.paginationParams);*/
        });

        this.cidSubscription = this.route.params.subscribe(
            (params: KeyValueInterface<any>) => {
                /*console.log(params);*/
                this.cid = params.id;
                this.getManufacturers();
            }
        );

        this.productService.getPaginationParamsSubscription().subscribe((paginationParams: PaginationParamsInterface): void => {
            this.paginationParams = { ... paginationParams };
            /*console.log('Filter getPaginationParamsSubscription', this.paginationParams);*/
        });

        this.filterForm = this.formBuilder.group({
            manufacturers: new FormArray([]),
            priceFrom: ['0'],
            priceTo: ['0']
        });

        this.onChanges();
    }

    /*public addCheckboxes() {
        this.filterForm.controls.manufacturers = new FormArray([]);
        this.manufacturers.map(() => {
            const control = new FormControl(false);
            (this.filterForm.controls.manufacturers as FormArray).push(control);
        });
    }*/

    public getManufacturers(): void {
        this.getmanufacturersSubscribe = this.manufacturerService.getItems(
            '0',
            '0',
            'title',
            '1',
            this.cid ? this.cid.toString() : '0'
        )
        .subscribe(
            (manufacturers: ManufacturerModel[]): void => {
                this.manufacturers = manufacturers;
                /*console.log('getManufacturers subscribe', this.manufacturers);*/
                /*this.addCheckboxes();*/
            },
            (error: HttpErrorResponse): void => {
                if (error.error instanceof HttpErrorResponse && error.error.status === 404) {
                    this.router.navigate([`/404`]);
                }
            }
        );
    }

    public priceFrom(event: HTMLInputEvent) {
        this.varsPriceFrom = event.target.value === '' ? '0' : event.target.value;
        if (this.filterForm.value.priceFrom !== this.varsPriceFrom) {
            const cloneValues = { ...this.filterForm.value };
            cloneValues.priceFrom = this.varsPriceFrom;
            this.filterForm.setValue(cloneValues);
        }
    }

    public priceTo(event: HTMLInputEvent) {
        this.varsPriceTo = event.target.value === '' ? '0' : event.target.value;
        if (this.filterForm.value.priceTo !== this.varsPriceTo) {
            const cloneValues = { ...this.filterForm.value };
            cloneValues.priceTo = this.varsPriceTo;
            this.filterForm.setValue(cloneValues);
        }
    }

    public onManufacturerChange(event: HTMLInputEvent) {
        const formArray: FormArray = this.filterForm.get('manufacturers') as FormArray;
        if (event.target.checked) {
            formArray.push(new FormControl(event.target.value));
        } else {
            let i: number = 0;

            formArray.controls.forEach((ctrl: AbstractControl) => {
                if (ctrl.value === event.target.value) {
                    formArray.removeAt(i);
                    return;
                }

                i++;
            });
        }
        /*console.log(formArray);*/
    }

    public getProducts() {
        console.log('Filter getProducts');
        let cid = '0';
        if (
        typeof this.params !== 'undefined' &&
        typeof this.params.category !== 'undefined' &&
        typeof this.params.category.cid !== 'undefined') {
            cid = this.params.category.cid;
        }
        if (!!this.getproductsSubscription) {
            this.getproductsSubscription.unsubscribe();
        }

        this.filterService.next({
            varsPriceFrom: this.varsPriceFrom,
            varsPriceTo: this.varsPriceTo,
            varsManufacturers: this.varsManufacturers,
            cid: cid.toString()
        });

        /*console.log(this.varsPriceFrom, this.varsPriceTo, this.varsManufacturers, cid.toString(), this.cid);
        if (
            this.varsPriceFrom !== '0' ||
            this.varsPriceTo !== '-1' ||
            this.varsManufacturers.length !== 0 ||
            cid.toString() !== this.cid
        ) {*/
            /*this.getproductsSubscription = this.productService.getProducts(
                this.paginationParams.current.toString(),
                this.paginationParams.perPage.toString(),
                'product_id',
                '1',
                this.varsPriceFrom,
                this.varsPriceTo,
                this.varsManufacturers ? this.varsManufacturers : [],
                cid,
                []
            ).subscribe((products: ProductModel[]): void => {
                this.productSegment = products;
                this.paginationParams = { ... {
                    total: this.paginationParams.total,
                    perPage: this.paginationParams.perPage,
                    current: 1,
                    controlsCount: 7
                }};
                this.productService.next(this.productSegment, this.paginationParams);
            });*/
        /*}*/
    }

    public onChanges() {
        /*console.log('onChanges');*/
        this.onchangeSubscription = this.filterForm.valueChanges.subscribe(() => {
            /*console.log('onChanges subscribe');*/
            /*let tmp: [] = [];
            if (this.varsManufacturers) {
                tmp = this.varsManufacturers;
            }
            console.log(this.filterForm.value.manufacturers.join());
            this.varsManufacturers = this.filterForm.value.manufacturers
            .map((v: string, i: string): string | null => {
                return v ? this.manufacturers[i].manufacturer_id : null;
            })
            .filter(v => v !== null);*/

            /*console.log(this.filterForm.value.manufacturers.join(), this.varsManufacturers);*/
            if (this.filterForm.value.manufacturers.join() !== this.varsManufacturers) {
                this.varsManufacturers = this.filterForm.value.manufacturers.join();
                //this.getItemsCount();
                this.getProducts();
            }

            if (this.filterForm.value.priceTo !== this.varsPriceTo) {
                //this.getItemsCount();
                this.getProducts();
            }

            if (this.filterForm.value.priceForm !== this.varsPriceFrom) {
                //this.getItemsCount();
                this.getProducts();
            }
        });
    }

    public spoiler(type: string) {
        /*console.log(type);*/
        switch (type) {
            case 'manufacturers':
                this.spoilerManufacturersShow = !this.spoilerManufacturersShow;
                break;
        }
    }

    public ngOnDestroy () {
        if (!!this.cidSubscription) {
            this.cidSubscription.unsubscribe();
        }
        if (!!this.getpaginationparamsSubscription) {
            this.getpaginationparamsSubscription.unsubscribe();
        }
        if (!!this.subscription) {
            this.subscription.unsubscribe();
        }
        if (!!this.onchangeSubscription) {
            this.onchangeSubscription.unsubscribe();
        }
        if (!!this.getproductsSubscription) {
            this.getproductsSubscription.unsubscribe();
        }
        if (!!this.getitemscountSubscription) {
            this.getitemscountSubscription.unsubscribe();
        }
        if (!!this.getmanufacturersSubscribe) {
            this.getmanufacturersSubscribe.unsubscribe();
        }
    }
}
