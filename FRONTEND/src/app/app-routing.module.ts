import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './frontoffice/pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'backoffice',
    loadChildren: () => import('./backoffice/backoffice.module').then((m) => m.BackofficeModule),
  },
  {
    path: 'client',
    loadChildren: () => import('./clientoffice/clientoffice.module').then((m) => m.ClientofficeModule),
  },
  {
    path: '',
    loadChildren: () => import('./frontoffice/frontoffice.module').then((m) => m.FrontofficeModule),
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
