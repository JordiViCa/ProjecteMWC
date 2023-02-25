import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './frontoffice/pages/footer/footer.component';
import { HeaderComponent } from './frontoffice/pages/header/header.component';
import { LoginComponent } from './frontoffice/pages/login/login.component';
import { SignupComponent } from './frontoffice/pages/signup/signup.component';
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
  },
  {path: 'header',component:HeaderComponent},
  {path: 'login',component:LoginComponent},
  {path: 'signup',component:SignupComponent},
  {path: 'footer',component:FooterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
