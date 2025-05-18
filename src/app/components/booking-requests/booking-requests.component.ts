import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/Order/order.service';  // Adjust the path accordingly
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface BookingRequest {
  client: string;
  date: string;
  category: string;
  service: string;
  price: number;
  payment: string;
  status: 'pending' | 'approved' | 'refused';
}

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, DatePipe],
  providers: [OrderService],
  templateUrl: './booking-requests.component.html',
  styleUrls: ['./booking-requests.component.css']
})
export class BookingRequestsComponent implements OnInit {
  selectedFilter: 'all' | 'pending' | 'approved' | 'refused' = 'all';
  vendorId = localStorage.getItem('id');
  requests: BookingRequest[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    console.log('Vendor ID:', this.vendorId);
  if (!this.vendorId) {
    alert('Vendor ID not found. Please log in again.');
    return;
  }
  this.loadOrders();
}

  loadOrders() {
  if (!this.vendorId) {
    console.error('Vendor ID not found in localStorage');
    return;
  }

  this.orderService.getOrdersByVendorId(this.vendorId).subscribe({

    next: (res) => {
      this.requests = res.data.map((order: any) => ({
        client: order.full_name,
        date: order.date,
        category: order.package?.serviceId?.category || 'N/A',
        service: order.package?.serviceId?.title || 'N/A',
        price: order.total_price,
        payment: order.payment || 'Unpaid',
        status: order.status || 'pending'
      }));
      console.log('Orders loaded successfully', this.requests);
    },
    error: (err) => {
      console.error('Failed to fetch orders', err);
      this.requests = [];
    }
  });
}


  get filteredRequests(): BookingRequest[] {
    if (this.selectedFilter === 'all') {
      return this.requests;
    }
    return this.requests.filter(r => r.status === this.selectedFilter);
  }

  updateStatus(request: BookingRequest, status: 'approved' | 'refused') {
    // Here you might want to call an API to update the status in the backend
    request.status = status;
  }
}
