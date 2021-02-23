import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { ArticlecreateComponent } from '../articlecreate/articlecreate.component';
import { ArticleeditComponent } from '../articleedit/articleedit.component';
import { AttributeeditComponent } from '../attributeedit/attributeedit.component';
import { AttributesComponent } from '../attributes/attributes.component';
import { CategoriesComponent } from '../categories/categories.component';
import { CategorycreateComponent } from '../categorycreate/categorycreate.component';
import { ManufacturercreateComponent } from '../manufacturercreate/manufacturercreate.component';
import { MediamanagerComponent } from '../mediamanger/mediamanager.component';
import { OrderComponent } from '../order/order.component';
import { OrdersComponent } from '../orders/orders.component';
import { ProducteditComponent } from '../productedit/productedit.component';
import { ProductsComponent } from '../products/products.component';
import { ProfileComponent } from '../profile/profile.component';
import { StoreimportComponent } from '../storeimport/storeimport.component';
import { UsereditComponent } from '../useredit/useredit.component';
import { UsergroupeditComponent } from '../usergroupedit/usergroupedit.component';
import { UsergroupsComponent } from '../usergroups/usergroups.component';
import { UsersComponent } from '../users/users.component';
import { AdministratorComponent } from './administrator/administrator.component';

const routes: Routes = [
    {
        path: '',
        component: AdministratorComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'users',
                component: UsersComponent
            },
            {
                path: 'users/:id/edit',
                component: UsereditComponent
            },
            {
                path: 'usergroups',
                component: UsergroupsComponent
            },
            {
                path: 'usergroups/create',
                component: UsergroupeditComponent
            },
            {
                path: 'usergroups/:id/edit',
                component: UsergroupeditComponent
            },
            {
                path: 'categories',
                component: CategoriesComponent
            },
            {
                path: 'categories/create',
                component: CategorycreateComponent
            },
            {
                path: 'categories/:id/edit',
                component: CategorycreateComponent
            },
            {
                path: 'products',
                component: ProductsComponent,
                data: {
                    type: 'administrator'
                }
            },
            {
                path: 'products/create',
                component: ProducteditComponent
            },
            {
                path: 'products/attributes',
                component: AttributesComponent
            },
            {
                path: 'products/attributes/:id',
                component: AttributeeditComponent
            },
            {
                path: 'products/attributes/:id/edit',
                component: AttributeeditComponent
            },
            {
                path: 'articles/:id/edit',
                component: ArticleeditComponent
            },
            {
                path: 'articles/create',
                component: ArticlecreateComponent
            },
            {
                path: 'products/:id/edit',
                component: ProducteditComponent
            },
            {
                path: 'manufacturers/create',
                component: ManufacturercreateComponent
            },
            {
                path: 'orders',
                component: OrdersComponent
            },
            {
                path: 'orders/:id',
                component: OrderComponent
            },
            {
                path: 'storeimport',
                component: StoreimportComponent,
            },
            {
                path: 'mediamanager',
                component: MediamanagerComponent,
            }
        ]
    }
]
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdministratorRoutingModule { }
