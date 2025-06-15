import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/userservices/user.service';
import { HttpClientModule } from '@angular/common/http';
import { error } from 'jquery';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-super-admin-page',
  imports: [ HttpClientModule, FormsModule],
  templateUrl: './super-admin-page.component.html',
  styleUrl: './super-admin-page.component.css',
  providers: [UserService]
})
export class SuperAdminPageComponent implements OnInit {
  admins: any;
  newAdminEmail: string = '';

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.getAdmins().subscribe(
      (response)=>{
        this.admins = response.data
      },
      (error)=>{
        this.alertFail("error",error.error?.message );
      }

    )
  }
  alertFail(title: string, text: string) {
      Swal.fire({
        icon: 'error',
        title: title,
        text: text,
        confirmButtonText: "ok",
        customClass: {
          popup: 'custom-swal-popup',
        }
      })
    }
  deleteAdmin(id: any) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This action will delete the admin permanently.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'Cancel',
    customClass: {
      popup: 'custom-swal-popup',
    }
  }).then((result) => {
    if (result.isConfirmed) {
      this.userService.deleteUserById(id).subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Admin has been deleted.',
            confirmButtonText: 'OK',
            customClass: {
              popup: 'custom-swal-popup',
            }
          });
          // Remove the deleted admin from the list
          this.admins = this.admins.filter((admin: any) => admin._id !== id);
        },
        (error) => {
          this.alertFail('Error', error.error?.message || 'Failed to delete admin.');
        }
      );
    }
  });
}
  makeAdmin() {
  if (!this.newAdminEmail || this.newAdminEmail.trim() === '') {
    this.alertFail('Validation Error', 'Please enter a valid email address.');
    return;
  }

  this.userService.makeAdmin(this.newAdminEmail).subscribe(
    (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'User has been promoted to Admin.',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'custom-swal-popup',
        }
      });
      this.newAdminEmail = '';
      // Refresh the admin list
      this.userService.getAdmins().subscribe((res) => {
        this.admins = res.data;
      });
    },
    (error) => {
      this.alertFail('Error', error.error?.message || 'Failed to promote user.');
    }
  );
}

}
