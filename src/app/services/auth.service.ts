// import { Injectable } from '@angular/core';
// import { User } from '../interfaces/user-interface';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private user:User | null = null;
//   setUser(user: User) {
//     this.user = user;
//   }

//   getUser(): User | null {
//     return this.user;
//   }

//   clearUser() {
//     this.user = null;
//   }
// }

import { Injectable } from '@angular/core';
import { User } from '../interfaces/user-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService
 {
  private user: User | null = null;

  setUser(user: User) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user)); // ⬅️ Store in localStorage
  }

  getUser(): User | null {
    if (!this.user) {
      const userData = localStorage.getItem('user');   // ⬅️ Retrieve from localStorage
      if (userData) {
        this.user = JSON.parse(userData);
      }
    }
    return this.user;
  }

  clearUser() {
    this.user = null;
    localStorage.removeItem('user'); // ⬅️ Clear from localStorage
  }
}

