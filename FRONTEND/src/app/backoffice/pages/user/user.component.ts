import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { DocumentService } from 'src/app/services/backoffice/document.service';
import { UserService } from 'src/app/services/backoffice/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user!: User;
  id: string;
  process: boolean = false;
  constructor(
    private userSVC: UserService,
    private route: ActivatedRoute,
    private documentSVC: DocumentService
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.userSVC.getUser(this.id).subscribe(
      (el: any) => {
        this.user = el;
        //console.log(el)
      }
    )
    /*
    this.documentSVC.getDocuments(this.id).subscribe(
      (el: any) => {
        //console.log(el)
      }
    )
    */
  }

  ngOnInit(): void {
  }

  uploadDocument(doc: any) {
    //console.log(doc)
  }

  toggleUser() {
    if (!this.process) {
      this.process = true;
      this.userSVC.toggleUser(this.user._id.$oid).subscribe(
        (el: any) => {
          this.process = false;
          this.user.activated = !this.user.activated;
        },
        error => {
          this.process = false;
        }
      )
    }
  }

}
