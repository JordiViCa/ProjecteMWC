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

  constructor(
    private userSVC: UserService,
    private route: ActivatedRoute,
    private documentSVC: DocumentService
  ) {
    this.userSVC.getUser(this.route.snapshot.paramMap.get('id')!).subscribe(
      (el: any) => {
        this.user = el;
        console.log(el)
      }
    )
    this.documentSVC.getDocuments().subscribe(
      (el: any) => {
        console.log(el)
      }
    )

  }

  ngOnInit(): void {
  }

  uploadDocument(doc: any) {
    console.log(doc)
  }

}
