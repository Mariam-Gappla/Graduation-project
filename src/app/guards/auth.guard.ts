import { CanActivateFn, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root' // بتخليها متاحة في كل التطبيق
})
export class userAuth{
  constructor(private router:Router){}
  CanActivateFn():boolean{
    let islogged

    islogged=localStorage.getItem('token')
    if(islogged)
    { 
      console.log("authorized")
      return true;
    }
    else
    { 
      console.log("not authorized")
      this.router.navigate(['/login'])
      return false;
    }
  }
}
export const authGuard: CanActivateFn = (route, state) => {
  return inject(userAuth).CanActivateFn();
};
