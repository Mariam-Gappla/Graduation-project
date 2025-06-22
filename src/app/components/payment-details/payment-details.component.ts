import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentServiceService } from '../../services/payment/payment-service.service';
import { error } from 'jquery';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../services/Order/order.service';
import { UserService } from '../../services/userservices/user.service';

@Component({
  selector: 'app-payment-details',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css',
  providers: [PaymentServiceService, OrderService, UserService]
})
export class PaymentDetailsComponent implements OnInit {
  PaymentId: any;
  payment: any;
  note: any;
  orderStatus: any;
  updatedStatusandNote:any;
  userEmail: any;
  constructor(
    private route:ActivatedRoute,
    private paymentService: PaymentServiceService,
    private orderservice: OrderService,
    private userService: UserService
  ){}
  ngOnInit(): void {
  this.route.params.subscribe((params) => {
    this.PaymentId = params['paymentId'];

    // Check if PaymentId is valid and not 'undefined' or empty
    if (this.PaymentId && this.PaymentId !== 'undefined' && this.PaymentId.trim() !== '') {
      this.paymentService.getPaymentByPatmentId(this.PaymentId).subscribe(
        (response) => {
          this.payment = response.data;
          console.log(this.payment);

          // Now safely get user by userId
          if (this.payment?.userId) {
            this.userService.getUserByUserId(this.payment.userId).subscribe(
              (res) => {
                this.userEmail = res.data.email;
                console.log(this.userEmail);
              },
              (error) => {
                console.error('Error fetching user details:', error);
                alert('Error occurred while fetching user details.');
              }
            );
          } else {
            console.error('Payment does not contain valid userId:', this.payment);
          }
        },
        (error: any) => {
          console.error('Error fetching payment details:', error);
          alert('Failed to load payment details. Please try again later.');
        }
      );
    } else {
      console.error('Invalid PaymentId:', this.PaymentId);
      alert('Invalid PaymentId. Cannot load payment details.');
    }
  });
}



  updatePaymentStatus(newStatus: string) {
  this.updatedStatusandNote = { status: newStatus, note: this.note };
  console.log(this.updatedStatusandNote);

  this.paymentService.updatePaymentStatusAndNote(this.PaymentId, this.updatedStatusandNote).subscribe(
    (response) => {
      console.log(response)
      if (this.payment) {
        this.payment.status = newStatus;
        this.payment.note = this.note;
      }

      alert('Payment status updated successfully.');

      // Fix: Use = instead of ==
      if (this.updatedStatusandNote.status === 'accepted') {
        this.orderStatus = 'paid';
      } else {
        this.orderStatus = 'payment_refused';
      }

      // Now call order update API
      this.orderservice.updateOrderStatus(this.payment.orderId, this.orderStatus).subscribe(
        (response) => {
          console.log('Order status updated successfully:', response);
        },
        (error) => {
          console.error('Error updating order status:', error);
          alert('An error occurred while updating order status.');
        }
      );
    },
    (error) => {
      console.error('Error updating payment status:', error);
      alert('An error occurred while updating payment status. Please try again.');
    }
  );
}

}
