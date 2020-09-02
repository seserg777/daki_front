import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProductsComponent } from './components/products/products.component';
import { FilterComponent } from './components/filter/filter.component';
import { CategoriesmoduleComponent } from './components/categoriesmodule/categoriesmodule.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriesComponent } from './components/categories/categories.component';

@NgModule({
    declarations: [
        PaginationComponent,
        ProductsComponent,
        FilterComponent,
        CategoriesmoduleComponent,
        CategoriesComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        PaginationComponent,
        ProductsComponent,
        FilterComponent,
        CategoriesmoduleComponent,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [

    ]
 })
export class SharedModule {}
