import { CanActivateFn, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
import { UserService } from './../services/userservices/user.service';
export class userAuth{
  constructor(private router:Router){}
 UserService= inject(UserService);
  CanActivateFn():boolean{
    let islogged

    islogged=localStorage.getItem('token') || sessionStorage.getItem('token')|| sessionStorage.getItem('token');
    if(islogged)
    {
      // console.log("authorized")
      return true;
    }
    else
    {
      // console.log("not authorized")
      this.router.navigate(['/'])
      return false;
    }
  }
}
export const adminGuard: CanActivateFn = (route, state) => {
  return true;
};
