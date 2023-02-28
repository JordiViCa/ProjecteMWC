import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authSVC: AuthService
  ) { }

  getUsers() {
    return this.http.get(environment.backendURL + 'api/clients', this.authSVC.getAuthHeader())
      .pipe(
        tap( res => res)
    );
  }

  getUser(id: string): Observable<Object> {
    return this.http.get(environment.backendURL + 'api/clients/'+id, this.authSVC.getAuthHeader());
  }

  getMe() {
    return this.http.get(environment.backendURL + 'api/auth/current-user', this.authSVC.getAuthHeader());
  }

  newUser(params: User) {
    return this.http.post(environment.backendURL + 'api/auth/register/client', JSON.stringify(params))
    .pipe(
      tap( res => res)
    )
  }

  updateUser(params: User,id: any) {
    return this.http.put(environment.backendURL + 'api/clients/'+id, JSON.stringify(params), this.authSVC.getAuthHeader())
    .pipe(
      tap( res => res)
    )
  }

}
