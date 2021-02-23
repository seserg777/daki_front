import { Component, OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ProductService } from '../../../common/services/product.service';
import { ProductModel } from '../../../common/models/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { merge, Subscription, Observable } from 'rxjs';
import { ManufacturerService } from '../../../common/services/manufacturer.service';
import { ManufacturerModel } from '../../../common/models/manufacturer.model';
import { CategoryService } from '../../../common/services/category.service';
import { CategoryModel } from '../../../common/models/category.model';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { LayoutService } from '../../../common/services/layout.service';
import { SearchresultModel } from '../../../common/models/searchresult.model';
import { SearchService } from '../../../common/services/search.service';
import { AttributeModel } from '../../../common/models/attribute.model';
import { AttributeService } from '../../../common/services/attribute.service';
import { AttributevalueService } from '../../../common/services/attributevalue.service';
import { AttributevalueModel } from '../../../common/models/attributevalue.model';
import { faTrashAlt, faSave, faTimesCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../../common/services/notification.service';
import { NotificationModel } from '../../../common/models/notification.model';

@Component({
    selector: 'app-productedit',
    templateUrl: 'productedit.component.html',
    styleUrls: ['productedit.component.css']
})
export class ProducteditComponent implements OnDestroy {
    public target: HTMLInputElement;
    public searchSubscription: Subscription;
    public results: KeyValueInterface<any>;
    public environment: KeyValueInterface<any> = environment;
    public faTrashAlt = faTrashAlt;
    public faSave = faSave;
    public faTimesCircle = faTimesCircle;
    public faPlusCircle = faPlusCircle;
    public product: ProductModel = new ProductModel;
    public manufacturers: ManufacturerModel[] = [];
    public attributes: AttributeModel[] = [];
    public attributesRows: AttributevalueModel[] = [];
    public submitted: boolean = false;
    public editProductForm: FormGroup;
    public formData: FormData = new FormData();
    public categories: CategoryModel[];
    public activeTab: string = 'main';
    private manufacturersStateSubscribe: Subscription;
    private categoryStateSubscribe: Subscription;
    private productStateSubscribe: Subscription;
    private productRemoveSubscribe: Subscription;
    private attributesSubscribe: Subscription;
    private attributeValueSubscribe: Subscription;
    private edit: Observable<ProductModel>;
    private merged: Observable<ProductModel>;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private manufacturerService: ManufacturerService,
        private router: Router,
        private route: ActivatedRoute,
        private titleService: Title,
        private categoryService: CategoryService,
        private searchService: SearchService,
        private layoutService: LayoutService,
        private attributeService: AttributeService,
        private attributeValueService: AttributevalueService,
        private notificationService: NotificationService
    ) {
        this.getItem();
        this.getManufacturers();
        this.getManufacturers();
        this.getAttributes();

        if (!!this.categoryStateSubscribe) {
            this.categoryStateSubscribe.unsubscribe();
        }
        this.categoryStateSubscribe = this.categoryService.getCategories('0', '0', 'cid', '1', '-1').subscribe((categories: CategoryModel[]): void => {
            this.categories = categories;
        });

        this.editProductForm = this.formBuilder.group({
            title: ['', Validators.required],
            short_description: [''],
            description: [''],
            price: ['', Validators.required],
            main_image: [''],
            manufacturer_id: [''],
            category_id: ['', Validators.required],
            state: ['', Validators.required],
            child_id: [''],
            product_quantity: [''],
            attributes: [''],
            meta_title: [''],
            meta_description: ['']
        });

        this.layoutService.onBodyClick.subscribe((event: MouseEvent): void => {
            if (!!event) {
                this.results = [];
                if (!!this.target) {
                    this.target.value = '';
                }
            }
        });
    }

    public get f(): KeyValueInterface<AbstractControl> {
        return this.editProductForm.controls;
    }

    public getManufacturers(): void {
        if (!!this.manufacturersStateSubscribe) {
            this.manufacturersStateSubscribe.unsubscribe();
        }
        this.manufacturersStateSubscribe = this.manufacturerService.getItems()
        .subscribe(
            (manufacturers: ManufacturerModel[]): void => {
                this.manufacturers = manufacturers;
                /*console.log(this.manufacturers);*/
            },
            (error: HttpErrorResponse): void => {
                if (error.error instanceof HttpErrorResponse && error.error.status === 404) {
                    this.router.navigate([`/404`]);
                }
            }
        );
    }

    public getItem(): void {
        const routeParam: string | null = this.route.snapshot.paramMap.get('id');
        if (typeof routeParam === 'string') {
            if (!!this.productStateSubscribe) {
                this.productStateSubscribe.unsubscribe();
            }
            this.productStateSubscribe = this.productService.getProduct(routeParam)
            .subscribe(
                (product: ProductModel): void => {
                    console.log(product);
                    this.product = product;

                    this.editProductForm.controls['title'].setValue(this.product.title);
                    this.editProductForm.controls['short_description'].setValue(this.product.short_description);
                    this.editProductForm.controls['description'].setValue(this.product.description);
                    this.editProductForm.controls['price'].setValue(this.product.price);
                    /*this.editProductForm.controls['media'].setValue(this.product.media);*/
                    this.editProductForm.controls['manufacturer_id'].setValue(this.product.manufacturer_id);
                    this.editProductForm.controls['category_id'].setValue(this.product.category_id);
                    this.editProductForm.controls['product_quantity'].setValue(this.product.product_quantity);
                    this.editProductForm.controls['state'].setValue(this.product.state);
                    this.editProductForm.controls['meta_title'].setValue(this.product.meta_title);
                    this.editProductForm.controls['meta_description'].setValue(this.product.meta_description);

                    if (!!this.product.child && this.product.child.length !== 0) {
                        const child: string[] = [];
                        for (const i of Object.keys(this.product.child)) {
                            child.push(this.product.child[i]['product_id']);
                        }
                        this.editProductForm.controls['child_id'].setValue(child.join(','));
                    }

                    if (!!this.product) {
                        this.getAttributeValues(this.product.product_id.toString());
                    }

                    this.titleService.setTitle(`Edit: ${this.product.title}`);
                },
                (error: HttpErrorResponse): void => {
                    if (error.error instanceof HttpErrorResponse && error.error.status === 404) {
                        this.router.navigate([`/404`]);
                    }
                }
            );
        }
    }

    public onSubmit(): void {
        /*console.log('onSubmit');*/
        this.submitted = true;

        if (this.editProductForm.invalid) {
            return;
        }

        this.edit = this.productService.edit(
            this.editProductForm.value.title,
            this.editProductForm.value.short_description,
            this.editProductForm.value.description,
            this.editProductForm.value.price,
            this.editProductForm.value.manufacturer_id,
            this.editProductForm.value.category_id,
            this.editProductForm.value.child_id,
            this.editProductForm.value.product_quantity,
            this.editProductForm.value.state,
            this.product.product_id,
            this.editProductForm.value.attributes,
            this.editProductForm.value.meta_title,
            this.editProductForm.value.meta_description
        );

        /*if (this.formData.get('files')) {*/
            const media = this.productService.media(
                this.product.product_id,
                this.formData
            );

            this.merged = merge(this.edit, media);

            this.merged.subscribe(
                (r: ProductModel): void => {
                    /*console.log(r);
                    this.product = new ProductModel(r);*/
                    const response: NotificationModel = new NotificationModel({type: 'success', msg: 'Product already edited!'});
                    this.notificationService.next(response);
                    this.router.navigate([`/administrator/products/${r.product_id}/edit`]);
                },
                (error: HttpErrorResponse): void => {
                    console.error(error);
                }
            );
        /*} else {
            this.edit.subscribe(
                (r: ProductModel): void => {
                    this.product = new ProductModel(r);
                    this.router.navigate([`/administrator/products/${r.product_id}/edit`]);
                },
                (error: HttpErrorResponse): void => {
                    console.error(error);
                }
            );
        }*/
    }

    public onFileChangeHandler(type: string, event?: MouseEvent, id?: number): void {
        const target: HTMLInputElement = event?.target as HTMLInputElement;
        if (!event || !target || !target.files || !target.files.length) {
          return;
        }

        this.formData = new FormData();

        switch (type) {
            case 'image': {
                this.formData.append(`files[${type}][${id}]`, target.files[0]);
                /*console.log(this.formData.get(`files[${type}][${id}]`));*/
                break;
            }

            case 'attr_value_image': {
                this.formData.append(`files[${type}][${id}]`, target.files[0]);
                /*console.log(this.formData.get(`files[${type}][${id}]`));*/
                break;
            }
        }
    }

    public emitFileInputClick(): void {
        const input: HTMLInputElement = document.createElement('input');
        input.setAttribute('type', 'file');
        input.addEventListener(
            'change',
            (event: Event): void => this.onFileChangeHandler('image', event as MouseEvent, this.product.product_id)
        );
        input.click();
        input.remove();
    }

    public attrValueFileInput(e: MouseEvent, attr_value_id: number): void {
        const target: HTMLInputElement = e.target as HTMLInputElement;
        if(!!target) {
            target.className = 'btn btn-success';
            const input: HTMLInputElement = document.createElement('input');
            input.setAttribute('type', 'file');
            input.addEventListener(
                'change',
                (event: Event): void => this.onFileChangeHandler('attr_value_image', event as MouseEvent, attr_value_id)
            );
            input.click();
            input.remove();
        }
    }

    public getAttributeValues(product_id: string): void {
        this.attributeValueSubscribe = this.attributeValueService.getItems( '0', '0', 'attr_id',  '1', '', product_id).subscribe((attributevalues: AttributevalueModel[]): void => {
            if (!!attributevalues) {
                this.attributesRows = attributevalues;
            }
        });
    }

    public getAttributes(): void {
        this.attributesSubscribe = this.attributeService.getItems().subscribe((attributes: AttributeModel[]): void => {
            this.attributes = attributes;
        });
    }

    public addAttributeRow(): void {
        const table: HTMLElement | null = document.getElementById('attributes-list');
        const select: HTMLElement | null = document.getElementById('attributes-select');

        if (!!select) {
            const e = (select) as HTMLSelectElement;
            const attr_id: number = Number(e.selectedOptions[0].value);
            const title: string = e.selectedOptions[0].text;

            if (!!table && !!attr_id && !!title) {
                const row = new AttributevalueModel();
                row.attr_id = attr_id;
                row.title = title;
                row.product_id = this.product.product_id;
                this.attributesRows.push(row);
            }
        }
    }

    public changeAttributeRow(event: MouseEvent, index: number): void {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        if(!!target) {
            const name: string = target.name;
            this.attributesRows[index][name] = target.value;
            this.editProductForm.controls['attributes'].setValue(JSON.stringify(this.attributesRows));
        }
    }

    public removeAttributeRow(index: number): void {
        this.attributesRows.splice(index, 1);
        this.editProductForm.controls['attributes'].setValue(JSON.stringify(this.attributesRows));
    }

    public removeMedia(media_id: string): void {
        console.log('removeMedia', media_id);
    }

    public searchChild(event: MouseEvent): void {
        this.target = event.target as HTMLInputElement;
        if ( !!this.target && this.target.value.length > 2 ) {
            if (!!this.searchSubscription) {
            this.searchSubscription.unsubscribe();
            }

            this.searchSubscription = this.searchService.search(
                '0',
                '6',
                'title',
                '1',
                this.target.value
            ).subscribe((results: SearchresultModel[]): void => {
                this.results = {
                    products: [],
                    articles: []
                }
                for (const i of Object.keys(results)) {
                    switch (results[i]['type']) {
                        case 'product':
                            this.results['products'].push(results[i]);
                            break;
                        case 'article':
                            this.results['articles'].push(results[i]);
                            break;
                    }
                }
            });
        }
    }

    public addChild(product: SearchresultModel ): void {
        const child_ids: string = this.editProductForm.value.child_id ? this.editProductForm.value.child_id.toString() : '';
        if (!this.editProductForm.value.child_id) {
            this.editProductForm.controls['child_id'].setValue(product.id.toString());
        } else {
            const q = child_ids.split(',');
            q.push(product.id.toString());
            this.editProductForm.controls['child_id'].setValue(q.join(','));
        }
    }

    public changeTab(anchor: string): void {
        this.activeTab = anchor;
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

    public ngOnDestroy(): void {
        if (!!this.manufacturersStateSubscribe) {
            this.manufacturersStateSubscribe.unsubscribe();
        }
        if (!!this.categoryStateSubscribe) {
            this.categoryStateSubscribe.unsubscribe();
        }
        if (!!this.productStateSubscribe) {
            this.productStateSubscribe.unsubscribe();
        }
        if (!!this.searchSubscription) {
            this.searchSubscription.unsubscribe();
        }
        if (!!this.attributesSubscribe) {
            this.attributesSubscribe.unsubscribe();
        }
        if (!!this.attributeValueSubscribe) {
            this.attributeValueSubscribe.unsubscribe();
        }
        if (!!this.productRemoveSubscribe) {
            this.productRemoveSubscribe.unsubscribe();
        }
    }
}
