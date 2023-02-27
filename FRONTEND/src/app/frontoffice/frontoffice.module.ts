import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { FrontofficelayoutComponent } from './layout/frontofficelayout/frontofficelayout.component';
import { HomeComponent } from './pages/home/home.component';
import { CourseComponent } from './pages/course/course.component';
import { ArriagoComponent } from './pages/arriago/arriago.component';
import { AboutComponent } from './pages/about/about.component';



@NgModule({
  declarations: [
    LoginComponent,
    FrontofficelayoutComponent,
    HomeComponent,
    CourseComponent,
    ArriagoComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule
  ]
})
export class FrontofficeModule { }
