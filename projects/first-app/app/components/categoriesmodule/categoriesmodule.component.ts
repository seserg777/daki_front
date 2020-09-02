import { Component } from '@angular/core';
import { CategoryService } from '../../../common/services/category.service';
import { CategoryformoduleModel } from '../../../common/models/categoryformodule.model';
import { ActivatedRoute } from '@angular/router';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { KeyValueInterface } from '../../../common/interfaces/key-value.interface';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-categoriesmodule',
    templateUrl: 'categoriesmodule.component.html',
    styleUrls: ['categoriesmodule.component.css']
})
export class CategoriesmoduleComponent {
  public categories: CategoryformoduleModel[];
  public faPlusSquare = faPlusSquare;
  public faMinusSquare = faMinusSquare;
  public cidSubscription: Subscription;
  private cid: number | null;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    /*this.getItems();*/
    /*this.cid = this.route.snapshot.paramMap.get('id');*/
    this.cidSubscription = this.route.params.subscribe(
      (params: KeyValueInterface<any>) => {
          /*console.log(params);*/
          this.cid = params.id;
          this.getItems();
      }
    );
  }

  public getItems() {
    this.categoryService.getCategoriesforModule().subscribe((categories: CategoryformoduleModel[]): void => {
      this.categories = categories;
      /*console.log(this.categories);*/
    });
  }

  public toggle (event: HTMLInputEvent) {
    const parent = event.target.closest('.parent');
    if (!!parent) {
      parent.classList.toggle('opened');
    }
  }

  public checkOpenedChilds (childs: CategoryformoduleModel[]): boolean {
    let exist: boolean = false;
    for (const i in childs) {
      if (typeof this.cid !== 'undefined' && this.cid !== null && childs[i]['cid'].toString() === this.cid.toString()) {
        exist = true;
      }
    }
    return exist;
  }
}
