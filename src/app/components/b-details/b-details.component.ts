import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-b-details',
  imports: [ReactiveFormsModule],
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
      // send to API or show confirmation
    } else {
      alert('Please fill in all required fields');
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
