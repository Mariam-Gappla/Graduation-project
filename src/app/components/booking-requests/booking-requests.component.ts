import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/Order/order.service';  // Adjust path if needed
import { HttpClientModule } from '@angular/common/http';
import { OrderInterface } from '../../../models/order-interface';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DatePipe],
  providers: [OrderService],
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.css']
})
export class BookingRequestsComponent implements OnInit {
  selectedFilter = 'all';
  vendorId = localStorage.getItem('id') || sessionStorage.getItem('id');;
  requests: OrderInterface[] = [];

  constructor(private orderService: OrderService) {}

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

    if (this.selectedFilter === 'all') {
      // Load all orders for this vendor (no status filter)
      this.orderService.getOrdersByVendorId(this.vendorId).subscribe({
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
          console.log('Loaded all vendor orders', this.requests);
        },
        error: (err) => {
          console.error('Failed to fetch orders', err);
          this.requests = [];
        }
      });
    } else {
      console.log(`${this.selectedFilter} ,${this.vendorId}`);
      // Load orders filtered by status and vendorId
      this.orderService.getOrdersByFilters(this.selectedFilter, this.vendorId).subscribe({

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
          console.log(`Loaded vendor orders with status=${this.selectedFilter}`, this.requests);
        },
        error: (err) => {
          console.error('Failed to fetch filtered orders', err);
          this.requests = [];
        }
      });
    }
  }

  updateStatus(request: OrderInterface, status: 'confirmed' | 'refused'): void {
    if (!request._id) {
      alert('Order ID missing.');
      return;
    }
    this.orderService.updateOrderStatus(request._id, status).subscribe({
      next: () => {
        request.status = status;
        this.loadFilteredOrders(); // Refresh the list after update
      },
      error: (err) => {
        console.error('Failed to update status', err);
        alert('Failed to update status. Please try again.');
      }
    });
  }
}
