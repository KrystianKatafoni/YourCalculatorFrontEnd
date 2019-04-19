import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  constructor() { }
  isAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
          }, 800);
      }
    );
    return promise;
  }
  setLoggedIn() {
    this.loggedIn = true;
  }
  setLoggedOut() {
    this.loggedIn = false;
  }
}
