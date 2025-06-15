import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PaymentServiceService } from '../../services/payment/payment-service.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/Order/order.service';
import { UserService } from '../../services/userservices/user.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, NgIf],
  providers: [PaymentServiceService, OrderService, UserService],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  paymentForm: FormGroup;
  screenshot: File | null = null;
  imageSrc: string | ArrayBuffer | null = null; // To preview the uploaded screenshot
  orderId: any;
  vendorId: any;
  userId: any;
  paymentMethods: any[] = [];

  constructor(
    private fb: FormBuilder,
    private payService: PaymentServiceService,
    private route: ActivatedRoute,
    private orderservice: OrderService,
    private userservice: UserService
  ) {
    this.paymentForm = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      amount: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('id') || sessionStorage.getItem('id');
    this.route.params.subscribe((params) => {
      this.orderId = params['orderId'];
      this.orderservice.getOrderId(this.orderId).subscribe(
        (response) => {
          this.vendorId = response.data.package.vendorId;

          this.userservice.getUserByUserId(this.vendorId).subscribe(
            (response: any) => {
              this.paymentMethods = response.data.paymentMethods || [];
              console.log('Payment Methods:', this.paymentMethods);
            },
            (error: any) => {
              console.error('Error fetching user:', error);
              this.paymentMethods = [];
            }
          );
        },
        (error) => {
          console.error('Error fetching order', error);
          this.paymentMethods = [];
        }
      );
    });
  }

  // Handle file input change: store file and generate preview
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.screenshot = event.target.files[0];

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.screenshot!);
    } else {
      this.screenshot = null;
      this.imageSrc = null;
    }
  }

  // ...existing code...

  onSubmit(): void {
    if (this.paymentForm.invalid || !this.screenshot) {
      alert('Please fill all fields and upload a screenshot.');
      return;
    }

    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      alert('You are not logged in. Please login first.');
      return;
    }

    const formData = new FormData();

    // Append form fields
    Object.entries(this.paymentForm.value).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    // Append the file
    formData.append('screenshot', this.screenshot!, this.screenshot!.name);

    // Append additional required fields
    formData.append('userId', this.userId);
    formData.append('orderId', this.orderId);
    formData.append('vendorId', this.vendorId);

    // Add the 'path' field as required by backend
    formData.append('path', this.screenshot ? this.screenshot.name : '');

    this.payService.submitPayment(formData).subscribe({
      next: (response) => {
        alert('Payment submitted successfully!');
        this.paymentForm.reset();
        this.screenshot = null;
        this.imageSrc = null;
      },
      error: (error) => {
        alert('Failed to submit payment. Please try again.');
        console.error(error);
      },
    });
  }


  hasPaymentMethod(methodName: string): boolean {
    return this.paymentMethods?.some(
      (m: any) => m.name.toLowerCase() === methodName.toLowerCase()
    );
  }

  get selectedPaymentMethod() {
    const selectedName = this.paymentForm.get('paymentMethod')?.value;
    return (
      this.paymentMethods.find(
        (method: any) =>
          method.name.toLowerCase().trim() === selectedName?.toLowerCase().trim()
      ) || null
    );
  }
}
