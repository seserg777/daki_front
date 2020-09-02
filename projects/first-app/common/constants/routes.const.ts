import { Routes } from '@angular/router';
import { BaseComponent } from '../../app/components/base/base.component';
import { NotFoundComponent } from '../../app/components/notfound/notfound.component';
import { HomePageComponent } from '../../app/components/homepage/homepage.component';
import { ProductsComponent } from '../../app/components/products/products.component';
import { ProductComponent } from '../../app/components/product/product.component';
import { ArticlesComponent } from '../../app/components/articles/articles.component';
import { ArticleComponent } from '../../app/components/article/article.component';
import { CategoriesComponent } from '../../app/components/categories/categories.component';
import { CategoryComponent } from '../../app/components/category/category.component';
import { LoginComponent } from '../../app/components/login/login.component';
import { RegisterComponent } from '../../app/components/register/register.component';
import { ManufacturerComponent } from '../../app/components/manufacturer/manufacturer.component';
import { WishlistComponent } from '../../app/components/wishlist/wishlist.component';


export const ROUTES: Routes = [
    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: '',
                component: HomePageComponent,
                pathMatch: 'full'
            },
            {
                path: 'ru',
                component: HomePageComponent,
                pathMatch: 'full'
            },
            {
                path: '404',
                component: NotFoundComponent
            },
            {
                path: 'ru/products',
                component: ProductsComponent,
                data: {
                    type: 'front'
                }
            },
            {
                path: 'products',
                component: ProductsComponent,
                data: {
                    type: 'front'
                }
            },
            {
                path: 'ru/products/:id',
                component: ProductComponent
            },
            {
                path: 'products/:id',
                component: ProductComponent
            },
            {
                path: 'products/page/:page',
                component: ProductsComponent
            },
            {
                path: 'ru/articles',
                component: ArticlesComponent
            },
            {
                path: 'articles',
                component: ArticlesComponent
            },
            {
                path: 'ru/articles/:id',
                component: ArticleComponent
            },
            {
                path: 'articles/:id',
                component: ArticleComponent
            },
            {
                path: 'ru/categories',
                component: CategoriesComponent
            },
            {
                path: 'categories',
                component: CategoriesComponent
            },
            {
                path: 'ru/categories/:id',
                component: CategoryComponent
            },
            {
                path: 'categories/:id',
                component: CategoryComponent
            },
            {
                path: 'manufacturers/:id',
                component: ManufacturerComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'registration',
                component: RegisterComponent
            },
            {
                path: 'wishlist',
                component: WishlistComponent
            }
        ]
    },
    {
        path: 'administrator',
        loadChildren: 'app/components/administrator/administrator.module#AdministratorModule'
    },
    { path: '**', component: NotFoundComponent }
];
