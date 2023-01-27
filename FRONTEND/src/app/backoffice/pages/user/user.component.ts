import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = {
    name: "Jordi",
    surname: "Vila",
    nif: "145678G",
    nifDocument: undefined
  }

  constructor() { }

  ngOnInit(): void {
  }

  uploadDocument(doc: any) {
    console.log(doc)
  }

}
