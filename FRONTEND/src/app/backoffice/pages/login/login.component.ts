import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/backoffice/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showErrors = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userSVC: UserService
  ) { }

  ngOnInit(): void {
    this.initFormLogin()
  }

  initFormLogin() {
    this.loginForm = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      remember: [false, []]
    });
  }

  sendFormLogin() {
    if (this.loginForm.valid) {
      let token = this.userSVC.getToken(this.loginForm.value.username,this.loginForm.value.password)
      if (token) { // MAKE CALL TO ENDPOINT TO CHECK CREDENTIALS
        this.router.navigateByUrl("/backoffice")
      } else {
        this.showErrors = true;
      }
    } else {
      this.showErrors = true;
    }
  }
}
