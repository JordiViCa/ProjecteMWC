import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontofficelayoutComponent } from './layout/frontofficelayout/frontofficelayout.component';
import { ArriagoComponent } from './pages/arriago/arriago.component';
import { CourseComponent } from './pages/course/course.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/information/about.component';


const routes: Routes = [
  {
    path: '',
    component: FrontofficelayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent
      },
      {
        path:'arriago',
        component:ArriagoComponent
      },
      {
        path:'course',
        component:CourseComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule {}
