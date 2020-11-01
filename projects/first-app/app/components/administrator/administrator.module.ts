import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministratorComponent } from './administrator/administrator.component';
import { RouterModule } from '@angular/router';
import { ADMINISTRATOR_ROUTES } from '../../../common/constants/administrator.routes';
import { ProfileComponent } from '../profile/profile.component';
import { CategorycreateComponent } from '../categorycreate/categorycreate.component';
import { ArticleeditComponent } from '../articleedit/articleedit.component';
import { ArticlecreateComponent } from '../articlecreate/articlecreate.component';
import { ProducteditComponent } from '../productedit/productedit.component';
import { ManufacturercreateComponent } from '../manufacturercreate/manufacturercreate.component';
import { OrdersComponent } from '../orders/orders.component';
import { StoreimportComponent } from '../storeimport/storeimport.component';
import { OrderComponent } from '../order/order.component';
import { HeaderadminComponent } from '../headeradmin/headeradmin.component';
import { SharedModule } from '../../shared.module';
import { MediamanagerComponent } from '../mediamanger/mediamanager.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AttributeeditComponent } from '../attributeedit/attributeedit.component';
import { AttributesComponent } from '../attributes/attributes.component';
import { UsersComponent } from '../users/users.component';
import { UsereditComponent } from '../useredit/useredit.component';
import { UsergroupsComponent } from '../usergroups/usergroups.component';
import { UsergroupeditComponent } from '../usergroupedit/usergroupedit.component';
import { ArticlesComponent } from '../articles/articles.component';

@NgModule({
  declarations: [
    AdministratorComponent,
    ProfileComponent,
    CategorycreateComponent,
    ArticlesComponent,
    ArticleeditComponent,
    ArticlecreateComponent,
    ProducteditComponent,
    ManufacturercreateComponent,
    OrdersComponent,
    OrderComponent,
    StoreimportComponent,
    HeaderadminComponent,
    MediamanagerComponent,
    AttributeeditComponent,
    AttributesComponent,
    UsersComponent,
    UsereditComponent,
    UsergroupsComponent,
    UsergroupeditComponent
  ],
  imports: [
    FontAwesomeModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ADMINISTRATOR_ROUTES)
  ]
})

export class AdministratorModule {}
