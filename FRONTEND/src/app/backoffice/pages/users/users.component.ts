import { Component, OnInit } from '@angular/core';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [
    {
      name: "Pepe",
      surname: "Lopez",
      nif: "145678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "15678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "1678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    },
    {
      name: "Jordi",
      surname: "Vila",
      nif: "12345678G", 
    }
  ]

  buscador: string = "";
  constructor() { }

  ngOnInit(): void {
    console.log(this.users);
  }

  updateUsers() {
    this.users
  }
}
