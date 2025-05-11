import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
 {path:"home",loadComponent:()=>import('../app/components/home/home.component').then(m => m.HomeComponent)},
 {path:"login",loadComponent:()=>import('../app/components/login/login.component').then(m=>m.LoginComponent)},
 {path:"",loadComponent:()=>import('../app/components/signup/signup.component').then(m=>m.SignupComponent)},
 {path:"b-details",loadComponent:()=>import('../app/components/b-details/b-details.component').then(b=>b.BDetailsComponent)},
 {path:"booking",loadComponent:()=>import('../app/components/booking/booking.component').then(b=>b.BookingComponent)},
 {path:"details",loadComponent:()=>import('../app/components/details/details.component').then(d=>d.DetailsComponent)},
 {path:"vendor",loadComponent:()=>import('../app/components/vendor/vendor.component').then(v=>v.VendorComponent)},
 {path:"editservice",loadComponent:()=>import('../app/components/edit-service/edit-service.component').then(e=>e.EditServiceComponent)},
 {path:"forgetpassword",loadComponent:()=>import('../app/components/forget-password/forget-password.component').then(m=>m.ForgetPasswordComponent)},
 {path:"**",loadComponent:()=>import('../app/components/error/error.component').then(m=>m.ErrorComponent)},
];
