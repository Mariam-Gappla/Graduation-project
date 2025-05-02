import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/userservices/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule,HttpClientModule],
  providers:[UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userLogin:FormGroup;
constructor(private fb:FormBuilder,private userservice:UserService,private route:Router){
  this.userLogin=this.fb.group({
  email:['',[Validators.required]],
  password:['',[Validators.required]],
  })
}
get email()
{
  return this.userLogin.get('email');
}
get password()
{
  return this.userLogin.get('password');
}
sendData()
{
  const token=localStorage.getItem('token');
  if(!token)
  {
    alert("please register first");
    this.route.navigate(['/']);
    return;
  }
this.userservice.loginUser(this.userLogin.value).subscribe(
  (res)=>{
 alert("Login sucessfully");
 this.route.navigate(['/home']);
},
(err)=>{
  alert(err.error.message);
}
);
}
}
