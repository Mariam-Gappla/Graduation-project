
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { vendorGuard } from './guards/vendor.guard';
import { userGuard } from './guards/user.guard';

export const routes: Routes = [
 {path:"",loadComponent:()=>import('../app/components/home/home.component').then(m => m.HomeComponent)},
 {path:"login",loadComponent:()=>import('../app/components/login/login.component').then(m=>m.LoginComponent)},
 {path:"signup",loadComponent:()=>import('../app/components/signup/signup.component').then(m=>m.SignupComponent)},
 {path:"vendors/:category",loadComponent:()=>import('../app/components/vendors/vendors.component').then(m=>m.VendorsComponent),canActivate:[authGuard]},
 {path:"b-details",loadComponent:()=>import('../app/components/b-details/b-details.component').then(b=>b.BDetailsComponent),canActivate:[authGuard]},
 {path:"booking/:orderId",loadComponent:()=>import('../app/components/booking/booking.component').then(b=>b.BookingComponent),canActivate:[authGuard]},
 {path:"details/:vendorId",loadComponent:()=>import('../app/components/details/details.component').then(d=>d.DetailsComponent),canActivate:[authGuard]},
 {path:"vendor/:vendorId",loadComponent:()=>import('../app/components/vendor/vendor.component').then(v=>v.VendorComponent),canActivate:[authGuard]},
// Update the import path and export to the correct component for orders
 {path:"orders",loadComponent:()=>import('../app/components/my-orders/my-orders.component').then(m=>m.MyOrdersComponent),canActivate:[authGuard]},//,userGuard]
 {path:"editservice",loadComponent:()=>import('../app/components/edit-service/edit-service.component').then(e=>e.EditServiceComponent),canActivate:[authGuard, vendorGuard]},
 {path:"paymentdetails/:paymentId",loadComponent:()=>import('../app/components/payment-details/payment-details.component').then(e=>e.PaymentDetailsComponent),canActivate:[authGuard, vendorGuard]},
 {path:"editservice/:id",loadComponent:()=>import('../app/components/edit-service/edit-service.component').then(e=>e.EditServiceComponent),canActivate:[authGuard, vendorGuard]},
 {path:"forgetpassword",loadComponent:()=>import('../app/components/forget-password/forget-password.component').then(m=>m.ForgetPasswordComponent),canActivate:[authGuard]},
 {path:"admin",loadComponent:()=>import('../app/AdminComponents/admin-component/admin-component.component').then(m=>m.AdminComponentComponent)},//,canActivate:[authGuard]
 {path:"orderrequest",loadComponent:()=>import('../app/components/booking-requests/booking-requests.component').then(m=>m.BookingRequestsComponent)},//,canActivate:[authGuard]
 {path:"vendorservices/:id",loadComponent:()=>import('../app/components/vendorservices/vendorservices.component').then(m=>m.VendorservicesComponent)},//,canActivate:[authGuard,vendorGuard]
 {path:"admin/vendor/:vendorId",loadComponent:()=>import('../app/components/vendor/vendor.component').then(v=>v.VendorComponent)},//,canActivate:[authGuard]
 {path:"vendor-profile",loadComponent:()=>import('../app/components/add-vendor-method/add-vendor-method.component').then(v=>v.VendorPaymentMethodComponent),canActivate:[authGuard,vendorGuard]},//,canActivate:[authGuard]

 {path:"adminservices",loadComponent:()=>import('../app/AdminComponents/admin-pages/services/services.component').then(m=>m.ServicesComponent)},//,canActivate:[authGuard]
 {path:"**",loadComponent:()=>import('../app/components/error/error.component').then(m=>m.ErrorComponent)},
];
