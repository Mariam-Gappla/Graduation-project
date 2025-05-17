import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/userservices/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule, HttpClientModule],
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userLogin: FormGroup;
  constructor(private fb: FormBuilder, private userservice: UserService, private route: Router) {
    this.userLogin = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  get email() {
    return this.userLogin.get('email');
  }
  get password() {
    return this.userLogin.get('password');
  }
  sendData() {
    this.userservice.loginUser(this.userLogin.value).subscribe(
      (res) => {

        console.log('Response:', res);
        localStorage.setItem('token',res.data.token)
         localStorage.setItem('id',res.data._id)
        this.route.navigate(['/home'])
      },
      (err) => {
        alert(err.error.message);
      }
    );

  }
}
