import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isUserDefined = false;

  private _user!: User;
  private _admin!: Admin;

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService
  ) {

  }

  async isLoggedIn(): Promise<boolean> {
    return this._user != null
  }

  async isLoggedInAdmin(): Promise<boolean> {
    return this._admin != null
  }

  private static handleError(error: any): any {
    console.log(error)
    // show request url 
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `Message: ${error.message}, Details: ${error.details}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'))
  }

  async attemptLogin(loginData: any, admin: boolean = false): Promise<boolean> {
    if (admin) {
      return new Promise( resolve => this.adminLogin(loginData).subscribe(
        (el: any) => {
          console.log(el)
          if (el === false) {
            resolve(false);
          } else {
            this._admin = el.admin;
            this.tokenService.saveToken(el.token);
            resolve(true);
          }
        }
      ));
    } else {
      return new Promise( resolve => this.login(loginData).subscribe(
        (el: any) => {
          if (el === false) {
            resolve(false);
          } else {
            this._user = el.user;
            this.tokenService.saveToken(el.token);
            resolve(true);
          }
        }
      ));
    }
  }

  login(loginData: any): Observable<any>  {
    const body = {
      email: loginData.user,
      password: loginData.password
    }
    return this.http.post(environment.backendURL + 'api/auth/login/client', JSON.stringify(body), this.getLoginHeader())
      .pipe(
        tap( res => res),
        catchError(() => of(false))
      );
  }

  adminLogin(loginData: any): Observable<any>  {
    const body = {
      email: loginData.user,
      password: loginData.password
    }
    return this.http.post(environment.backendURL + 'api/auth/login/admin', JSON.stringify(body), this.getLoginHeader())
      .pipe(
        tap( res => res),
        catchError(() => of(false))
      );
  }

  getPersistedToken(): string {
    return this.tokenService.getToken() || '';
  }

  getAuthHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.getPersistedToken()}`
      }),
      withCredentials: true
    }
  };
  getLoginHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }
}
