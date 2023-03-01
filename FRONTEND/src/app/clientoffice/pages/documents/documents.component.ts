import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { User } from 'src/app/models/user';
import { DocumentService } from 'src/app/services/backoffice/document.service';
import { UserService } from 'src/app/services/backoffice/user.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent {
  user!: User;
  id!: string;
  uploadForm: FormGroup;
  file!: File;
  upload: boolean = false;

  constructor(
    private userSVC: UserService,
    private documentSVC: DocumentService,
    private formBuilder: FormBuilder
  ) {
    this.uploadForm = this.formBuilder.group({
      file: [null, [Validators.required]],
      nameSelector: ["", Validators.required]
    });
    this.userSVC.getMe().subscribe(
      (el: any) => {
        console.log("CurrentUser",el)
        this.id = el.data._id.$oid;
        this.user = el.data;
      }
    );
  }

  loadImage(event: any) {
    // Agafar l'arxiu i assignar-lo al formulari
    this.file = event.target.files[0];
  }

  uploadDocument() {
    if (this.uploadForm.valid) {
      let params = {
        file: this.file,
        name: this.uploadForm.value.nameSelector
      }
      this.documentSVC.uploadDocument(params).subscribe(
        (el: any) => {
          console.log(el)
          this.userSVC.getMe().subscribe(
            (el: any) => {
              this.user = el.data;
              this.upload = false;
            }
          );
        }
      )
    }
  }

  closePopup(event: any) {
    if (event.target.id == "close") {
      this.upload = !this.upload;
    }
  }

  getDocument(id: any) {
    this.documentSVC.getDocument(id).then((response: any) =>{
        console.log(response);
        let el = new File([response],'test.png')
        saveAs(el,'test.png');
    });
  }

  deleteDocument(id: any) {
    this.documentSVC.deleteDocument(id).subscribe(
      (el: any) => {
        console.log(el)
      }
    )
  }
}
