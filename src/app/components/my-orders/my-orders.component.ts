import { Component } from '@angular/core';
import { OrderInterface } from '../../../models/order-interface';
import { DatePipe, NgClass, NgIf, NgStyle, TitleCasePipe } from '@angular/common';
import { OrderService } from '../../services/Order/order.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-my-orders',
  imports: [HttpClientModule, DatePipe, NgStyle, NgIf],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
  providers: [OrderService]
})
export class MyOrdersComponent {
  userId = localStorage.getItem('id');
  orders: OrderInterface[] = [];
  constructor(private orderService: OrderService) {}

ngOnInit(): void {
    if (!this.userId) {
      alert('Vendor ID not found. Please log in again.');
      return;
    }
    this.loadFilteredOrders();
  }
  loadFilteredOrders(): void {
    if (!this.userId) {
      console.error('Vendor ID not found in localStorage');
      this.orders = [];
      return;
    }

      // Load all orders for this vendor (no status filter)
      this.orderService.getOrderByUserId(this.userId).subscribe({
        next: (res) => {
          this.orders = res.data.map((order: any) => ({
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
          console.log('Loaded all vendor orders', this.orders);
        },
        error: (err) => {
          console.error('Failed to fetch orders', err);
          this.orders = [];
        }
      });

  }
  deleteOrder(orderId: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.orderService.deleteOrder(orderId).subscribe({
        next: () => {
          alert('Order deleted successfully');
          this.loadFilteredOrders();
        },
        error: (err) => {
          console.error('Failed to delete order', err);
          alert('Failed to delete order');
        }
      });
    }
  }


}
