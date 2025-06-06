import { CanActivateFn, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // makes it available across the whole app
})
export class userAuth {
  constructor(private router: Router) {}

  CanActivateFn(): boolean {
    let token = localStorage.getItem('token') || sessionStorage.getItem('token') || sessionStorage.getItem('token');

    if (token) {
      console.log('authorized');
      return true;
    } else {
      console.log('not authorized');
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(userAuth).CanActivateFn();
};
