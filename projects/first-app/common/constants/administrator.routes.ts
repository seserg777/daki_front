import { Routes } from '@angular/router';
import { AdministratorComponent } from '../../app/components/administrator/administrator/administrator.component';
import { ManufacturercreateComponent } from '../../app/components/manufacturercreate/manufacturercreate.component';
import { OrdersComponent } from '../../app/components/orders/orders.component';
import { OrderComponent } from '../../app/components/order/order.component';
import { StoreimportComponent } from '../../app/components/storeimport/storeimport.component';
import { ProfileComponent } from '../../app/components/profile/profile.component';
import { AuthGuardService } from '../../common/guards/auth.guard';
import { CategorycreateComponent } from '../../app/components/categorycreate/categorycreate.component';
import { ArticlecreateComponent } from '../../app/components/articlecreate/articlecreate.component';
import { ArticleeditComponent } from '../../app/components/articleedit/articleedit.component';
import { ProducteditComponent } from '../../app/components/productedit/productedit.component';
import { MediamanagerComponent } from '../../app/components/mediamanger/mediamanager.component';
import { AttributesComponent } from '../../app/components/attributes/attributes.component';
import { AttributeeditComponent } from '../../app/components/attributeedit/attributeedit.component';
import { ProductsComponent } from '../../app/components/products/products.component';
import { CategoriesComponent } from '../../app/components/categories/categories.component';
import { UsersComponent } from '../../app/components/users/users.component';
import { UsereditComponent } from '../../app/components/useredit/useredit.component';
import { UsergroupsComponent } from '../../app/components/usergroups/usergroups.component';
import { UsergroupeditComponent } from '../../app/components/usergroupedit/usergroupedit.component';

export const ADMINISTRATOR_ROUTES: Routes = [
    {
        path: '',
        component: AdministratorComponent,
        canActivate: [AuthGuardService],
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
