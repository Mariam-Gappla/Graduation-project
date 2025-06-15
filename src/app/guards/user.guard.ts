
import { CanActivateFn, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root' // بتخليها متاحة في كل التطبيق
})
export class userRole{
  constructor(private router:Router){}
  CanActivateFn():boolean{
  let  role=localStorage.getItem('role')|| sessionStorage.getItem('role');
    if(role === 'Bride/Groom')
    {
      console.log("authorized")
      return true;
    }
    else
    {
      console.log("not authorized")
      this.router.navigate(['/home'])
      return false;
    }
  }
}
export const userGuard: CanActivateFn = (route, state) => {
  return inject(userRole).CanActivateFn();
};
