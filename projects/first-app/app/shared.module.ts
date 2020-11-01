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
import { CutTextPipe } from '../common/pipes/cut-text.pipe';
import { StripHtmlPipe } from '../common/pipes/striphtml.pipe';
import { ArticleComponent } from './components/article/article.component';
import { CategoryComponent } from './components/category/category.component';
import { ManufacturerComponent } from './components/manufacturer/manufacturer.component';

@NgModule({
    declarations: [
        ManufacturerComponent,
        CategoryComponent,
        ArticleComponent,
        PaginationComponent,
        ProductsComponent,
        FilterComponent,
        CategoriesmoduleComponent,
        CategoriesComponent,
        CutTextPipe,
        StripHtmlPipe
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
        FormsModule,
        CutTextPipe,
        StripHtmlPipe
    ],
    providers: [

    ]
 })
export class SharedModule {}
