import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/userservices/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule,HttpClientModule,RouterModule],
  providers:[UserService],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
  standalone:true
})
export class ForgetPasswordComponent {
forgetPassword:FormGroup
users:any
constructor(private fb:FormBuilder,private userservice:UserService,private route:Router)
{
  this.forgetPassword=this.fb.group({
    email:['',[Validators.required,Validators.pattern(/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/)]],
    password:['',[Validators.required,Validators.pattern(/^(?=[^0-9]*[0-9][^0-9]*$)[a-zA-Z0-9]{2,}$/)]]
  })
}
get email()
{
  return this.forgetPassword.get('email')?.value;
}
get password()
{
  return this.forgetPassword.get('password')?.value
}
sendData()
{
 this.userservice.getAllUsers().subscribe(
  (res)=>{
     this.users=res.data;
     const existuser = this.users.filter((item:any) => item.email == this.email);
     this.userservice.updatePassword(this.forgetPassword.value,existuser[0]._id).subscribe((res)=>{
      alert(res.message)
      this.route.navigate(['/login'])
     })
 }
)

}
}
