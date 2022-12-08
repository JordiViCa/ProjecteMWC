import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users = [
    {
      name: "jordi",
      surname: "Vila",
      nif: "145678G", 
    },
    {
      name: "jordi",
      surname: "Vila",
      nif: "15678G", 
    },
    {
      name: "jordi",
      surname: "Vila",
      nif: "1678G", 
    },
    {
      name: "jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "jordi",
      surname: "Vila",
      nif: "12345678G", 
    }
  ]

  buscador = "";
  constructor() { }

  ngOnInit(): void {
    console.log(this.users);
  }

}
