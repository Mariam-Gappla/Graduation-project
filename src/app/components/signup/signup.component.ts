
import { HttpClientModule } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { UserService } from '../../services/userservices/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,HttpClientModule,JsonPipe],
  providers:[UserService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone:true
})
export class SignupComponent {
  userRegister:FormGroup
  emails:string[]=[];
constructor(private fb:FormBuilder,private UserService:UserService,private route:Router){
  this.userRegister=this.fb.group({
    username:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    role:['',[Validators.required]],
  })
  
}
get username(){
  return this.userRegister.get('username')
}
get email()
{
  return this.userRegister.get('email')
}
get password()
{
  return this.userRegister.get('password')
}
getAllUsers(){
this.UserService.getAllUsers().subscribe((res)=>{
  for(let i=0;i<res.length;i++)
  {
    this.emails.push(res[i].email);
  }
})
}
sendData(){
  console.log(this.userRegister.value);
  this.UserService.registeruser(this.userRegister.value).subscribe(
    (res)=>{
      if(res.status==200)
      {
        localStorage.setItem('token',res.data.token);
        alert("Resgistration successfully")
        this.route.navigate(['/login']);
      }
    console.log(res);
  },
  (err)=>{
    alert(err.error.message);
  }
);

}
}
