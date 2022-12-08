import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getToken(username: string,password: string) {
    // TODO: Create call to backend to get token & check if user exists
    return "1234"
  }

  checkToken(token: string) {
    // TODO: Return true/false if token exists to proceed with login
    // Check expiration of token
    return true
  }
  
}
