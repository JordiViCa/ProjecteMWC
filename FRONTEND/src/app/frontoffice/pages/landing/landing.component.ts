import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {

  constructor(private router: Router) { }
  page = 0
  idiom = "";
  idiomes = [
    {nom: "Español", svg: 'spanish.svg', key: "es"},
    {nom: "Français", svg: 'french.svg', key: "fr"},
    {nom: "English", svg: 'english.svg', key: "en"},
    {nom: "Français", svg: 'french.svg', key: "fr"},
    {nom: "Français", svg: 'french.svg', key: "fr"},
    {nom: "Español", svg: 'spanish.svg', key: "es"},
    {nom: "Español", svg: 'spanish.svg', key: "es"},
    {nom: "English", svg: 'english.svg', key: "en"},
    {nom: "English", svg: 'english.svg', key: "en"},
    {nom: "English", svg: 'english.svg', key: "en"},
    {nom: "English", svg: 'english.svg', key: "en"},
    {nom: "English", svg: 'english.svg', key: "en"},
    {nom: "English", svg: 'english.svg', key: "en"},
  ]

  navigatePage(number: number) {
    if (this.page+number < this.idiomes.length && this.page+number >= 0) {
      this.page += number;
    }
  }

  changeIdiom(key: string) {
    this.idiom = key;
    console.log(this.idiom)
    this.router.navigateByUrl("/"+key+"/login")
  }
}
