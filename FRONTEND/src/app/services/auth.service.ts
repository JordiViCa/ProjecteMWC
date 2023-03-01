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
    return new Promise(resolve => this.getActualUser().subscribe(
      (el: any) => {
        if (el != false && el.type == "Client") {
          this._user = el;
        }
        //console.log("Log",this._user != null)
        //console.log(el)
        resolve(this._user != null);
      }
    ));
  }

  async isLoggedInAdmin(): Promise<boolean> {
    return new Promise(resolve => this.getActualUser().subscribe(
      (el: any) => {
        if (el != false && el.type == "Admin") {
          this._admin = el.data;
        }
        //console.log("Log",this._admin != null,el.type == "Admin")
        //console.log(el)
        resolve(this._admin != null);
      }
    ));
  }

  public getActualUser(): Observable<any> {
    return this.http.get(environment.backendURL + "/api/auth/current-user", this.getAuthHeader())
    .pipe(
      tap(res => res),
      catchError(() => of (false))
    );
  }

  async attemptLogin(loginData: any, admin: boolean = false): Promise<boolean> {
    if (admin) {
      return new Promise( resolve => this.adminLogin(loginData).subscribe(
        (el: any) => {
          //console.log(el)
          if (el === false) {
            resolve(false);
          } else {
            this._admin = el.user ;
            //console.log(this._admin)
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
    return {headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${this.getPersistedToken()}`
    }};
  };

  getAuthHeaderGetImg() {
    return {
      method: 'POST',
      headers: {
        'Accept': '*',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${this.getPersistedToken()}`,
      },
      observe: 'response',
      withCredentials: true
    };
  };

  getAuthHeaderDocument(size: any) {
    return {headers: {
      'Authorization': `Bearer ${this.getPersistedToken()}`
    }};
  };

  getLoginHeader() {
    return {headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }};
  }
}
