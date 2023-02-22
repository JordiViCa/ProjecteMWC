import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '../guards/admin-auth.guard';
import { BackofficeLayoutComponent } from './layouts/backoffice-layout/backoffice-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: BackofficeLayoutComponent,
    //canActivate: [AdminAuthGuard],
    children: [
      { path: '', component: HomeComponent},
      { path: 'users', component: UsersComponent},
      { path: 'users/:id', component: UserComponent},
      { path: 'chats', component: HomeComponent},
      { path: 'new-user', component: NewUserComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule {}
