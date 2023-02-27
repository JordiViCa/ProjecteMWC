import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAuthGuard } from '../guards/client-auth.guard';
import { ClientOfficeLayoutComponent } from './layout/client-office-layout/client-office-layout.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: ClientOfficeLayoutComponent,
    canActivate: [ClientAuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent
      },
      {
        path: 'user',
        component: UserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientofficeRoutingModule { }
