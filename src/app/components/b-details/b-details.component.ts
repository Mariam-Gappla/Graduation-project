import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorsService } from '../../services/vendors/vendors.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../services/Order/order.service';
import { UserService } from '../../services/userservices/user.service';

@Component({
  selector: 'app-b-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [VendorsService, OrderService, UserService],
  templateUrl: './b-details.component.html',
  styleUrl: './b-details.component.css',
})
export class BDetailsComponent implements OnInit {
  bookingForm: FormGroup;
  serviceId: string | null = null;
  vendor: any;
  vendorId:any
  paymentMethods:any

  // Add available payment methods
  payments: string[] = ['Cash', 'Credit Card', 'Bank Transfer', 'Mobile Payment'];
  message: any;
  success: any;

  constructor(
    private vendorservice: VendorsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private userservice:UserService
  ) {
    this.bookingForm = this.fb.group({
      bookingDate: ['', Validators.required],
      service: ['', Validators.required],
      name: ['', Validators.required],
      payment: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.serviceId = params['vendorId'];
      // // console.log(this.serviceId)
      if (this.serviceId) {
        // // console.log('Vendor ID received on booking details page:', this.serviceId);
        this.fetchVendorDetails();
      } else {
        // // console.log('No Vendor ID received on booking details page.');
      }
    });
  }

  fetchVendorDetails(): void {
    if (this.serviceId) {
      this.vendorservice.getVendorById(this.serviceId).subscribe((res) => {
        this.vendor = res.data;
        this.vendorId = res.data.vendorId
        // console.log('Vendor Details:', this.vendorId);
        this.userservice.getUserByUserId(this.vendorId).subscribe(
          (response: any) => {
          this.paymentMethods = response.data.paymentMethods;
          // // console.log(this.vendor);
        },
        (error: any) => {
          console.error('Error fetching user:', error);
        }
        )

      });
    }
  }

  onSubmit(): void {
  if (this.bookingForm.valid) {
    const userId = localStorage.getItem('id') || sessionStorage.getItem('id');
    if (!userId) {
      this.message = 'User ID not found. Please log in again.';
      this.success = false;
      return;
    }

    const orderData = {
      bookingDate: this.bookingForm.value.bookingDate,
      name: this.bookingForm.value.name,
      payment: this.bookingForm.value.payment,
      notes: this.bookingForm.value.notes,
      packageId: this.bookingForm.value.service,
      userId: userId,
      method: this.bookingForm.value.payment,
    };

    this.orderService.addOrder(orderData).subscribe({
      next: (response) => {
        this.success = true;
        this.message = 'Order placed successfully! Redirecting...';
        this.bookingForm.reset();

        setTimeout(() => {
          // Redirect user to orders or home page
          this.router.navigate(['/orders']);
        }, 2000);
      },
      error: (error) => {
        this.success = false;
        this.message = error.error?.message || 'Failed to place order. Please try again.';
      },
    });
  } else {
    this.success = false;
    this.message = 'Please fill in all required fields';
  }
}

  getServiceLabel(serviceId: string): string {
    const selectedPackage = this.vendor?.packages?.find((pkg: any) => pkg._id === serviceId);
    return selectedPackage ? selectedPackage.title : '';
  }

  getPrice(serviceId: string): number {
    const selectedPackage = this.vendor?.packages?.find((pkg: any) => pkg._id === serviceId);
    return selectedPackage ? +selectedPackage.price : 0;
  }

  // Getter methods
  get bookingDate() {
    return this.bookingForm.get('bookingDate');
  }
  get service() {
    return this.bookingForm.get('service');
  }
  get name() {
    return this.bookingForm.get('name');
  }
  get payment() {
    return this.bookingForm.get('payment');
  }
  get notes() {
    return this.bookingForm.get('notes');
  }

  getSelectedPackagePrice(): number {
    const selectedServiceId = this.bookingForm.value.service;
    const selectedPackage = this.vendor?.packages?.find((pkg: any) => pkg._id === selectedServiceId);
    return selectedPackage ? +selectedPackage.price : 0;
  }

  getSelectedPackageTitle(): string {
    const selectedServiceId = this.bookingForm.value.service;
    const selectedPackage = this.vendor?.packages?.find((pkg: any) => pkg._id === selectedServiceId);
    return selectedPackage ? selectedPackage.title : '';
  }
}
