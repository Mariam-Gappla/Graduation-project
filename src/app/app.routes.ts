import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
 {path:"home",loadComponent:()=>import('../app/components/home/home.component').then(m => m.HomeComponent)},
 {path:"login",loadComponent:()=>import('../app/components/login/login.component').then(m=>m.LoginComponent)},
 {path:"",loadComponent:()=>import('../app/components/signup/signup.component').then(m=>m.SignupComponent)},
 {path:"forgetpassword",loadComponent:()=>import('../app/components/forget-password/forget-password.component').then(m=>m.ForgetPasswordComponent)},
 {path:"**",loadComponent:()=>import('../app/components/error/error.component').then(m=>m.ErrorComponent)},
];
