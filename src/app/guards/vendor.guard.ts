
import { CanActivateFn, Router } from '@angular/router';
import { inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root' // بتخليها متاحة في كل التطبيق
})
export class vendorRole{
  constructor(private router:Router){}
  CanActivateFn():boolean{
  let  role=localStorage.getItem('role')
    if(role === 'Vendor')
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
export const vendorGuard: CanActivateFn = (route, state) => {
  return inject(vendorRole).CanActivateFn();
};
