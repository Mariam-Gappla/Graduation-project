import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-b-details',
  standalone: true, // This is required if you're using standalone components
  imports: [CommonModule, ReactiveFormsModule], // 👈 Add CommonModule here
  templateUrl: './b-details.component.html',
  styleUrl: './b-details.component.css'
})
export class BDetailsComponent {
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      bookingDate: ['', Validators.required],
      service: ['', Validators.required],
      name: ['', Validators.required],
      payment: ['', Validators.required],
      notes: [''],
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      console.log(this.bookingForm.value);
    } else {
      alert('Please fill in all required fields');
    }
  }

  getServiceLabel(service: string): string {
    switch (service) {
      case 'full': return 'Full Day Session + Unlimited Images';
      case 'half': return 'Half Day Session';
      default: return '';
    }
  }

  getPrice(service: string): number {
    switch (service) {
      case 'full': return 6000;
      case 'half': return 3500;
      default: return 0;
    }
  }

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
}
