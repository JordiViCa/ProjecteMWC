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
  activated!: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private userSVC: UserService
  ) {
    this.editUserForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.pattern(/^[a-z ]*$/i)]],
      surname1: ["", [Validators.required, Validators.pattern(/^[a-z ]*$/i)]],
      surname2: ["", [Validators.pattern(/^[a-z ]*$/i)]],
      birthDate: [new Date(), [Validators.required]],
      phone: ["", [Validators.pattern(/^(\+[0-9]{2})?\s?([0-9]\s?){9}$/i)]],
      postalCode: ["", [Validators.pattern(/^[0-9]{5}$/i)]],
      town: ["", []],
      address: ["", []],
    });
  }

  ngOnInit() {
    this.userSVC.getMe().subscribe(
      (el: any) => {
        let date = new Date(el.data.birthDate.$date);
        let mm: any = date.getMonth();
        if (date.getMonth() < 10) mm = '0'+date.getMonth();
        let dd: any = date.getDay();
        if (date.getDay() < 10) dd = '0'+date.getDay();
        console.log("CurrentUser",el)
        this.userID = el.data._id.$oid;
        this.activated = el.data.activated;
        this.editUserForm.get("name")?.patchValue(el.data.name);
        this.editUserForm.get("surname1")?.patchValue(el.data.surname1);
        this.editUserForm.get("surname2")?.patchValue(el.data.surname2);
        this.editUserForm.get("address")?.patchValue(el.data.address);
        this.editUserForm.get("birthDate")?.patchValue(date.getFullYear()+"-"+mm+"-"+dd);
        this.editUserForm.get("phone")?.patchValue(el.data.phone);
        this.editUserForm.get("postalCode")?.patchValue(el.data.postalCode);
        this.editUserForm.get("town")?.patchValue(el.data.town);
      }
    )
  }
  
  sendFormEdit() {
    let params: any = {
      name: this.editUserForm.value.name,
      surname1: this.editUserForm.value.surname1,
      surname2: this.editUserForm.value.surname2,
      birthDate: this.editUserForm.value.birthDate,
      phone: this.editUserForm.value.phone,
      postalCode: this.editUserForm.value.postalCode,
      town: this.editUserForm.value.town,
      address: this.editUserForm.value.address
    }
    this.userSVC.updateUser(params,this.userID).subscribe(
      (el: any) => {
        console.log("New User",el)
      }
    )
  }

  getInvalid(name: any) {
    console.log(this.editUserForm.value.birthDate)
    let el = this.editUserForm.controls[name].invalid;
    let el2 = this.editUserForm.controls[name].touched;
    return el != false && el2 == true;
  }
}
