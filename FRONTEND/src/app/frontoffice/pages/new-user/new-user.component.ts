import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/backoffice/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  newUserForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userSVC: UserService
  ) {
    this.newUserForm = this.formBuilder.group({
      password: ["", [Validators.required]],
      name: ["", [Validators.required]],
      surname1: ["", []],
      surname2: ["", []],
      birthDate: [new Date(), [Validators.required]],
      phone: ["", []],
      postalCode: ["", []],
      town: ["", []],
      address: ["", []],
      email: ["", [Validators.email]],
      nif: ["", [Validators.required]],
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
        console.log("New User",el)
      }
    )
  }

  ngOnInit() {

  }
}
