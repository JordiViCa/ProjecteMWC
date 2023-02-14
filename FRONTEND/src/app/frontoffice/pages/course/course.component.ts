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
    {'id':1,'name':'Learn Angles','description':'this it a course about Catalan','image':'https://images.randomhouse.com/cover/9781925418842'},
    {'id':2,'name':'Learn Angles','description':'this it a course about Catalan','image':'https://m.media-amazon.com/images/I/41mjFru%2B-1L._SX342_SY445_QL70_ML2_.jpg'},
    {'id':3,'name':'Learn Angles','description':'this it a course about Catalan','image':'https://images.randomhouse.com/cover/9781925418842'}


  ]

}
