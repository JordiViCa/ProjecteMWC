import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/backoffice/user.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  showErrors = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authSVC: AuthService,
    private tokenSVC: TokenService
  ) { }

  ngOnInit(): void {
    this.initFormLogin()
  }

  initFormLogin() {
    this.loginForm = this.formBuilder.group({
      user: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
      remember: [false, []]
    });
  }

  sendFormLogin() {
    if (this.loginForm.valid) {
      this.authSVC.attemptLogin(this.loginForm.value,true).then(
        (el: any) => {
          //console.log("Logged",el)
          this.router.navigateByUrl("/backoffice") 
        },
        (error: any) => {
          this.showErrors = true;
          //console.log(error)
        }
      )
    } else {
      this.showErrors = true;
    }
  }
}
