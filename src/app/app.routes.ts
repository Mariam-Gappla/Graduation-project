import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
 {path:"home",loadComponent:()=>import('../app/components/home/home.component').then(m => m.HomeComponent)},
 {path:"login",loadComponent:()=>import('../app/components/login/login.component').then(m=>m.LoginComponent)},
 {path:"",loadComponent:()=>import('../app/components/signup/signup.component').then(m=>m.SignupComponent)},
 {path:"vendors/:category",loadComponent:()=>import('../app/components/vendors/vendors.component').then(m=>m.VendorsComponent)},
 {path:"b-details",loadComponent:()=>import('../app/components/b-details/b-details.component').then(b=>b.BDetailsComponent)},
 {path:"booking",loadComponent:()=>import('../app/components/booking/booking.component').then(b=>b.BookingComponent)},
 {path:"details/:vendorId",loadComponent:()=>import('../app/components/details/details.component').then(d=>d.DetailsComponent)},
 {path:"vendor/:vendorId",loadComponent:()=>import('../app/components/vendor/vendor.component').then(v=>v.VendorComponent)},
 {path:"editservice",loadComponent:()=>import('../app/components/edit-service/edit-service.component').then(e=>e.EditServiceComponent)},
 {path:"editservice/:id",loadComponent:()=>import('../app/components/edit-service/edit-service.component').then(e=>e.EditServiceComponent)},
 {path:"forgetpassword",loadComponent:()=>import('../app/components/forget-password/forget-password.component').then(m=>m.ForgetPasswordComponent)},
 {path:"admin",loadComponent:()=>import('../app/AdminComponents/admin-component/admin-component.component').then(m=>m.AdminComponentComponent)},
 {path:"vendorservices/:id",loadComponent:()=>import('../app/components/vendorservices/vendorservices.component').then(m=>m.VendorservicesComponent)},
 {path:"**",loadComponent:()=>import('../app/components/error/error.component').then(m=>m.ErrorComponent)},
];
