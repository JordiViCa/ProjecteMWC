import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { FrontofficelayoutComponent } from './layout/frontofficelayout/frontofficelayout.component';
import { HomeComponent } from './pages/home/home.component';
import { CourseComponent } from './pages/course/course.component';
import { ArriagoComponent } from './pages/arriago/arriago.component';
import { AboutComponent } from './pages/information/about.component';
import { NewUserComponent } from './pages/new-user/new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FrontofficelayoutComponent,
    HomeComponent,
    CourseComponent,
    ArriagoComponent,
    AboutComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FrontofficeModule { }
