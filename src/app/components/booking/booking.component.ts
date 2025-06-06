import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentServiceService } from '../../services/payment/payment-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [PaymentServiceService],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {
  paymentForm: FormGroup;
  screenshot: File | null = null;

  constructor(private fb: FormBuilder, private payService: PaymentServiceService) {
    this.paymentForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      amount: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.screenshot = event.target.files[0];
    } else {
      this.screenshot = null;
    }
  }

  onSubmit() {
    if (this.paymentForm.invalid || !this.screenshot) {
      alert('Please fill all fields and upload a screenshot.');
      return;
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token') || sessionStorage.getItem('token');
    console.log('Token:', token);

    if (!token) {
      alert('You are not logged in. Please login first.');
      return;
    }

    const formData = new FormData();
    Object.entries(this.paymentForm.value).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append('screenshot', this.screenshot!, this.screenshot!.name);
    this.payService.submitPayment(formData, token).subscribe({
      next: (response) => {
        console.log('Payment submitted successfully:', response);
        alert('Payment submitted successfully!');
        this.paymentForm.reset();
        this.screenshot = null;
      },
      error: (error) => {
        console.error('Error submitting payment:', error);
        alert('Failed to submit payment. Please check your credentials or try again.');
      }
    });
  }
}
