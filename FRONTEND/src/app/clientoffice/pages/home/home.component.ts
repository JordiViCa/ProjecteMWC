import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/backoffice/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  user!: User;
  constructor(
    private userSVC: UserService,
    private authSVC: AuthService
  ) {
    this.authSVC.getActualUser().subscribe(
      (el: any) => {
        this.user = el.data;
      }
    )
  }
}
