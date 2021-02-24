import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    FontAwesomeModule,
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterRoutingModule
  ]
})

export class RegisterModule {}
