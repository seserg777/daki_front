import { Routes } from '@angular/router';
import { BaseComponent } from '../../app/components/base/base.component';
import { NotFoundComponent } from '../../app/components/notfound/notfound.component';
import { HomePageComponent } from '../../app/components/homepage/homepage.component';
import { ProductComponent } from '../../app/components/product/product.component';
import { LoginComponent } from '../../app/components/login/login.component';

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
                path: '404',
                component: NotFoundComponent
            },
            {
                path: 'products/:id',
                component: ProductComponent
            },
            {
                path: 'login',
                component: LoginComponent
            }
        ]
    },
    {
        path: 'administrator',
        loadChildren: () => import('../../app/components/administrator/administrator.module').then(m => m.AdministratorModule)
    },
    { path: '**', component: NotFoundComponent }
];
