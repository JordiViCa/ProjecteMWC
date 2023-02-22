import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { ArriagoComponent } from './pages/arriago/arriago.component';
import { CourseComponent } from './pages/course/course.component';
import { FooterComponent } from './pages/footer/footer.component';
import { HeaderComponent } from './pages/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SignupComponent } from './pages/signup/signup.component';



@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent,
    AboutComponent,
    ArriagoComponent,
    CourseComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    FrontofficeRoutingModule
  ]
})
export class FrontofficeModule { }
