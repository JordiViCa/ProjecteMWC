import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientofficeRoutingModule } from './clientoffice-routing.module';
import { ClientOfficeLayoutComponent } from './layout/client-office-layout/client-office-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ClientOfficeLayoutComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ClientofficeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClientofficeModule { }
