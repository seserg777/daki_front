import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { of } from 'rxjs/internal/observable/of';
import { CategoryService } from '../../../common/services/category.service';
import { PaginationParamsInterface } from '../../../common/interfaces/pagination-params.interface';
import { CategoryModel } from '../../../common/models/category.model';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-categories',
    templateUrl: 'categories.component.html',
    styleUrls: ['categories.component.css']
})
export class CategoriesComponent {
  public categorySegment: CategoryModel[];
  public paginationParams: PaginationParamsInterface;
  public startIndex: number = 0;
  private perPage: number = 12;
  private subscription: Subscription;

  constructor(
    private categoryService: CategoryService,
    private titleService: Title
  ) {
      this.categoryService.getCategoriesCount().subscribe((count: number): void => {
        this.paginationParams = {
          total: count,
          perPage: this.perPage,
          current: this.paginationParams ? this.paginationParams.current : 1,
          controlsCount: 7
        };
      });
      this.getItems();
      this.titleService.setTitle(`Categories`);
  }

  public getItems() {
    /*console.log('getItems');*/
    this.categoryService.getCategories(
      this.startIndex.toString(),
      this.perPage.toString(),
      'title',
      '1'
    ).subscribe((products: CategoryModel[]): void => {
      this.categorySegment = products;
      this.categoryService.next(products);
    });
  }

  public paginate(offset: number): void {
    /*console.log('CategoriesComponent paginate');*/
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
}
