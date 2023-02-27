import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/backoffice/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  editUserForm: FormGroup;
  userID!: string;
  constructor(
    private formBuilder: FormBuilder,
    private userSVC: UserService
  ) {
    this.editUserForm = this.formBuilder.group({
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

  ngOnInit() {
    this.userSVC.getMe().subscribe(
      (el: any) => {
        console.log("CurrentUser",el)
        this.userID = el.data._id.$oid;
        this.editUserForm.get("name")?.patchValue(el.data.name);
        this.editUserForm.get("surname1")?.patchValue(el.data.surname1);
        this.editUserForm.get("surname2")?.patchValue(el.data.surname2);
        this.editUserForm.get("address")?.patchValue(el.data.address);
        this.editUserForm.get("birthDate")?.patchValue(el.data.birthDate);
        this.editUserForm.get("email")?.patchValue(el.data.email);
        this.editUserForm.get("nif")?.patchValue(el.data.nif);
        this.editUserForm.get("phone")?.patchValue(el.data.phone);
        this.editUserForm.get("postalCode")?.patchValue(el.data.postalCode);
        this.editUserForm.get("town")?.patchValue(el.data.town);
      }
    )
  }
  
  sendFormEdit() {
    let params: User = {
      name: this.editUserForm.value.name,
      surname1: this.editUserForm.value.surname1,
      surname2: this.editUserForm.value.surname2,
      birthDate: this.editUserForm.value.birthDate,
      phone: this.editUserForm.value.phone,
      postalCode: this.editUserForm.value.postalCode,
      town: this.editUserForm.value.town,
      address: this.editUserForm.value.address,
      email: this.editUserForm.value.email,
      nif: this.editUserForm.value.nif
    }
    this.userSVC.updateUser(params,this.userID).subscribe(
      (el: any) => {
        console.log("New User",el)
      }
    )
  }
}
