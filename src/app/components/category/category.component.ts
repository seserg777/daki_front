import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryModel } from '../../../common/models/category.model';
import { CategoryService } from '../../../common/services/category.service';
import { HttpErrorResponse } from '@angular/common/http';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Title } from '@angular/platform-browser';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-aricle',
    templateUrl: 'category.component.html',
    styleUrls: ['category.component.css']
})
export class CategoryComponent implements OnDestroy {
    public category: CategoryModel = new CategoryModel;
    public faEdit = faEdit;
    public faTrashAlt = faTrashAlt;
    public categoryParams: any = {
        showCategoryDescription: true
    };
    public cidSubscription: Subscription;
    private getCategorySubscribe: Subscription;
    private removeSubscribe: Subscription;
    private cid: string = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
        private categoryService: CategoryService,
    ) {
        console.log('CategoryComponent constructor');
        this.cidSubscription = this.route.params.subscribe(
            (params): void => {
                console.log('this.cidSubscription');
                this.cid = params.id;
                this.getCategory();
            }
        );
    }

    public getCategory() {
        console.log('getCategory', this.cid);
        if (!!this.cid) {
            if (!!this.getCategorySubscribe) {
                this.getCategorySubscribe.unsubscribe();
            }
            this.getCategorySubscribe = this.categoryService.getCategory(this.cid)
            .subscribe(
                (category: CategoryModel): void => {
                    console.log('getCategory subscribe', this.cid, category);
                    this.categoryService.categoryNext(category);
                    this.category = category;

                    const cloneCategoryParams: any = {...this.categoryParams};
                    cloneCategoryParams.category = this.category;

                    this.categoryParams = cloneCategoryParams;

                    this.titleService.setTitle(`${this.category.title}`);
                },
                (error: HttpErrorResponse): void => {
                    if (error.error instanceof HttpErrorResponse && error.error.status === 404) {
                        this.router.navigate([`/404`]);
                    }
                }
            );
        }
    }

    public remove(id: string) {
        /*console.log('remove ' + id);*/
        this.removeSubscribe = this.categoryService.remove(id)
        .subscribe(
            (r: KeyValueInterface<any>): void => {
                console.log(r);
                this.router.navigate([`/categories`]);
            },
            (error: HttpErrorResponse): void => {
                console.error(error);
            }
        );
    }

    public ngOnDestroy () {
        if (!!this.cidSubscription) {
            this.cidSubscription.unsubscribe();
        }
        if (!!this.getCategorySubscribe) {
            this.getCategorySubscribe.unsubscribe();
        }
        if (!!this.removeSubscribe) {
            this.removeSubscribe.unsubscribe();
        }
    }
}
