import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { HomePageComponent } from './components/homepage/homepage.component';
import { NotFoundComponent } from './components/notfound/notfound.component';
import { ProductComponent } from './components/product/product.component';

const routes: Routes = [
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
            loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
        }
    ]
  },
  {
      path: 'administrator',
      loadChildren: () => import('./components/administrator/administrator.module').then(m => m.AdministratorModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
