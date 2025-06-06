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
      rememberMe: [false]
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

      const rememberMe = this.userLogin.get('rememberMe')?.value;

      if (rememberMe) {
        // Clear sessionStorage first
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('role');

        // Store in localStorage
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('id', res.data._id);
        localStorage.setItem('role', res.data.role);
        console.log('Stored in localStorage');
      } else {
        // Clear localStorage first
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('role');

        // Store in sessionStorage
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('id', res.data._id);
        sessionStorage.setItem('role', res.data.role);
        console.log('Stored in sessionStorage');
      }

      this.route.navigate(['/']);
    },
    (err) => {
      alert(err.error.message);
    }
  );
}

}
