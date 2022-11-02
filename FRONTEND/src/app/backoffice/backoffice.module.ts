import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { BackofficeLayoutComponent } from './layouts/backoffice-layout/backoffice-layout.component';


@NgModule({
  declarations: [
    SidebarComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    BackofficeLayoutComponent
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule
  ]
})
export class BackofficeModule { }
