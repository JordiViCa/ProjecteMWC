import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/backoffice/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {

  newUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userSVC: UserService,
    private authSVC: AuthService,
    private router: Router
  ) {
    this.newUserForm = this.formBuilder.group({
      password: ["", [Validators.required, Validators.minLength(8)]],
      name: ["", [Validators.required, Validators.pattern(/^[a-z ]*$/i)]],
      surname1: ["", [Validators.required, Validators.pattern(/^[a-z ]*$/i)]],
      surname2: ["", [Validators.pattern(/^[a-z ]*$/i)]],
      birthDate: [new Date(), [Validators.required]],
      phone: ["", [Validators.pattern(/^(\+[0-9]{2})?\s?([0-9]\s?){9}$/i)]],
      postalCode: ["", [Validators.pattern(/^[0-9]{5}$/i)]],
      town: ["", []],
      address: ["", []],
      email: ["", [Validators.email, Validators.required]],
      nif: ["", [Validators.required, Validators.pattern(/^[0-9]{8}[a-z]$/i)]],
    });
  }
  
  sendFormRegister() {
    let params: User = {
      password: this.newUserForm.value.password,
      name: this.newUserForm.value.name,
      surname1: this.newUserForm.value.surname1,
      surname2: this.newUserForm.value.surname2,
      birthDate: this.newUserForm.value.birthDate,
      phone: this.newUserForm.value.phone,
      postalCode: this.newUserForm.value.postalCode,
      town: this.newUserForm.value.town,
      address: this.newUserForm.value.address,
      email: this.newUserForm.value.email,
      nif: this.newUserForm.value.nif,
      activated: false
    }
    this.userSVC.newUser(params).subscribe(
      (el: any) => {
        //console.log("New User",el)
        let body = {
          email: this.newUserForm.value.email,
          password: this.newUserForm.value.password
        }
        this.authSVC.attemptLogin(body).then(
          (el: any) => {
            //console.log("Logged",el)
            this.router.navigateByUrl("/client") 
          },
          (error: any) => {
            //console.log(error)
          }
        )
      }
    )
  }

  getInvalid(name: any) {
    let el = this.newUserForm.controls[name].invalid;
    let el2 = this.newUserForm.controls[name].touched;
    return el != false && el2 == true;
  }
}