import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/userservices/user.service';

@Component({
  selector: 'app-add-vendor-method',
  imports: [FormsModule, NgIf, NgFor, HttpClientModule, ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './add-vendor-method.component.html',
  styleUrl: './add-vendor-method.component.css',
})
export class VendorPaymentMethodComponent implements OnInit {
  vendor: any;
  id: any;
  paymentMethod:any
  constructor(private userservice: UserService,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.id = localStorage.getItem('id') || sessionStorage.getItem('id');
    if (this.id) {
      // Now safe to call getUserByUserId
      this.userservice.getUserByUserId(this.id).subscribe(
        (response: any) => {
          this.vendor = response.data;
          console.log(this.vendor);
        },
        (error: any) => {
          console.error('Error fetching user:', error);
        }
      );
      this.userservice.getUserByUserId(this.id).subscribe();
    }
  }

  newPaymentMethod = {
    type: '',
    details: '',
  };

  successMessage = '';

  addPaymentMethod() {
  if (!this.vendor.paymentMethods) {
    // If paymentMethods array does not exist yet, initialize it
    this.vendor.paymentMethods = [];
  }

  // Prepare payment method object (NOT array)
  this.paymentMethod = {
    name: this.newPaymentMethod.type,
    number: this.newPaymentMethod.details
  };

  // Call the API to add the payment method
  this.userservice.addPaymentMethod(this.id, this.paymentMethod).subscribe(
    (response: any) => {
      console.log('Payment method added:', response);

      // Add the new method to the local vendor object for UI update
      this.vendor.paymentMethods.push(this.paymentMethod);

      // Reset form model
      this.newPaymentMethod = { type: '', details: '' };

      // Show confirmation message
      this.successMessage = 'Payment method added successfully!';
      setTimeout(() => (this.successMessage = ''), 3000);
    },
    (error: any) => {
      console.error('Error adding payment method:', error);
    }
  );

  // Optional: log what was submitted
  console.log('Submitted payment method:', this.paymentMethod);
}
deleteMethod(method: any) {
  this.userservice.deletePaymentMethod(this.id, method).subscribe(
    (response: any) => {
      console.log('Payment method deleted:', response);

      // Update local vendor object
      this.vendor.paymentMethods = this.vendor.paymentMethods.filter(
        (m: any) => !(m.name === method.name && m.number === method.number)
      );

      this.successMessage = 'Payment method deleted successfully!';
      setTimeout(() => (this.successMessage = ''), 3000);
    },
    (error: any) => {
      console.error('Error deleting payment method:', error);
    }
  );
}

}
