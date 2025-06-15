
import { HttpClientModule } from '@angular/common/http';
import { JsonPipe, NgIf } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { UserService } from '../../services/userservices/user.service';
import { Router } from '@angular/router';
import { confirmPassword } from '../../crossfieldvalidition/confirmpasswordvalidation';
import { existingEmail } from '../../crossfieldvalidition/emailvalidation';
@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,HttpClientModule,NgIf],
  providers:[UserService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone:true
})
export class SignupComponent implements OnInit {
  userRegister:FormGroup
  emails:string[]=[];
constructor(private fb:FormBuilder,private UserService:UserService,private route:Router){
  this.userRegister=this.fb.group({
    username:['',[Validators.required]],
    email:['',[Validators.required]],
    password:['',[Validators.required]],
    confirmPassword:['',[Validators.required]],
    role:['',[Validators.required]],
  },{validators:[confirmPassword()]})

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
get confirmPassword()
{
  return this.userRegister.get('confirmPassword')
}
ngOnInit(): void {

  this.UserService.getAllUsers().subscribe((res) => {
    this.emails = res.data.map((user: any) => user.email);


this.userRegister.setValidators([existingEmail(this.emails), confirmPassword()]);
    this.userRegister.updateValueAndValidity();
    console.log(this.emails);
  });
}

sendData() {
  // Destructure form value to exclude confirmPassword before sending
  const { confirmPassword, ...payload } = this.userRegister.value;

  this.UserService.registeruser(payload).subscribe(
    (res) => {
      if (res) {
        alert("Registration successfully");
        this.route.navigate(['/login']);
      }
    },
    (err) => {
      alert(err.error.message);
    }
  );

  // Return payload in case you want to check or use it elsewhere
  return payload;
}
}
