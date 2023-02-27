import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  constructor(
    private http: HttpClient,
    private authSVC: AuthService
  ) { }

  getDocuments(id: any) {
    return this.http.get(environment.backendURL + 'api/documents', this.authSVC.getAuthHeader())
      .pipe(
        tap( res => res)
    );
  }

  uploadDocument(params: any) {
    var formData: FormData =  new FormData();
    formData.append("file", params.file);
    formData.append("name", params.name);
    let contentLength = params.file.size + params.name.length;
    return this.http.post(environment.backendURL+"api/documents",formData, this.authSVC.getAuthHeaderDocument(contentLength))
  }

}
