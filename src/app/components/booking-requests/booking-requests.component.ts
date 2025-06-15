import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/Order/order.service';
import { HttpClientModule } from '@angular/common/http';
import { OrderInterface } from '../../../models/order-interface';
import { PaymentServiceService } from '../../services/payment/payment-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DatePipe, RouterModule],
  providers: [OrderService, PaymentServiceService],
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.css'],

})
export class BookingRequestsComponent implements OnInit {
  selectedFilter = 'all';
  vendorId = localStorage.getItem('id') || sessionStorage.getItem('id');
  requests: OrderInterface[] = [];

  // ✅ FIXED: use an object to hold each payment result by order ID
  orderPayments: { [orderId: string]: any } = {};

  constructor(
    private orderService: OrderService,
    private paymentService: PaymentServiceService
  ) {}

  ngOnInit(): void {
    if (!this.vendorId) {
      alert('Vendor ID not found. Please log in again.');
      return;
    }
    this.loadFilteredOrders();
  }

  onFilterChange(filter: string): void {
    this.selectedFilter = filter;
    this.loadFilteredOrders();
  }

  loadFilteredOrders(): void {
    if (!this.vendorId) {
      console.error('Vendor ID not found in localStorage');
      this.requests = [];
      return;
    }

    const loadOrders = this.selectedFilter === 'all'
      ? this.orderService.getOrdersByVendorId(this.vendorId)
      : this.orderService.getOrdersByFilters(this.selectedFilter, this.vendorId);

    loadOrders.subscribe({
      next: (res) => {
        this.requests = res.data.map((order: any) => ({
          _id: order._id,
          client: order.full_name,
          date: order.date,
          category: order.package?.serviceId?.category || 'N/A',
          service: order.package?.serviceId?.title || 'N/A',
          price: order.total_price,
          payment: order.payment || 'Unpaid',
          status: order.status || 'pending',
          method: order.method || 'N/A',
        }));
        console.log('Loaded orders:', this.requests);

        // ✅ FIXED: After loading orders, load payments by orderId
        this.requests.forEach((order) => {
          this.getOrderPayment(order._id);
        });
      },
      error: (err) => {
        console.error('Failed to fetch orders', err);
        this.requests = [];
      },
    });
  }

  updateStatus(request: OrderInterface, status: 'confirmed' | 'refused'): void {
    if (!request._id) {
      alert('Order ID missing.');
      return;
    }
    this.orderService.updateOrderStatus(request._id, status).subscribe({
      next: () => {
        request.status = status;
        this.loadFilteredOrders(); // Refresh after update
      },
      error: (err) => {
        console.error('Failed to update status', err);
        alert('Failed to update status. Please try again.');
      },
    });
  }

  // ✅ FIXED: Save each payment by its orderId in the orderPayments map
  getOrderPayment(orderId: any) {
    this.paymentService.getPaymentByOrderId(orderId).subscribe(
      (response: any) => {
        this.orderPayments[orderId] = response.data; // ✅ Save result
      },
      (error: any) => {
        console.error('Error fetching Payment:', error);
        this.orderPayments[orderId] = { error: true }; // Optional: show fallback in UI
      }
    );
  }
}
