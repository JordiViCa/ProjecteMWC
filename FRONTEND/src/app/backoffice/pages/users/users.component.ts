import { Component, OnInit } from '@angular/core';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { UserService } from 'src/app/services/backoffice/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  baseUsers: any[] = [];
  confirm = false;
  buscador: string = "";
  constructor(
    private userSVC: UserService
  ) {
    this.userSVC.getUsers().subscribe(
      (el: any) => {
        //console.log("Users",el)
        this.baseUsers = el;
        this.users = [...this.baseUsers];
      }
    )
  }

  ngOnInit(): void {
    //console.log(this.users);
  }

  updateUsers() {
    this.users
  }

  toggle(event: any) {
    this.confirm = !this.confirm;
    if (this.confirm) {
      this.users = this.baseUsers.filter(
        (user: any) => !user.activated
      )
    } else {
      this.users = [...this.baseUsers];
    }
  }
}
