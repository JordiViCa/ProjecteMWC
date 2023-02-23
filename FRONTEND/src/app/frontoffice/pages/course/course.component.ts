import { Component } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  constructor() { }

  ngOnIt(): void {}
  course=[
    {'id':1,'name':'Learn Angles','description':'this it a course about Catalan','image':'https://bebooks.io/wp-content/uploads/2021/02/libro-aprender-catalan-rapido.jpg'},
    {'id':2,'name':'Learn Angles','description':'this it a course about Catalan','image':'https://static.fnac-static.com/multimedia/Images/ES/NR/1d/8b/63/6523677/1507-1.jpg'},
    {'id':3,'name':'Learn Angles','description':'this it a course about Catalan','image':'https://atelierlibrosjuridicos.com/wp-content/uploads/2022/01/9788413593180_PORTADA_EXCEDENCIA_LABORAL_PEQUE-min.jpg'}


  ]

}
