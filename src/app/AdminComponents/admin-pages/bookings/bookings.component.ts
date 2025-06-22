import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/Order/order.service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bookings',
  imports: [HttpClientModule, DatePipe],
  providers: [OrderService],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent implements OnInit {
  statuses = ['waiting', 'accepted', 'refuces']
  Payments = ['Online', 'cash']
  bookings: any[] = [];
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe((res: any) => {
      this.bookings = res.data;
    });
  }


  bookings2 = [
    {
      id: 1,
      category: 'Car Repair',
      date: '2025-05-01',
      status: 'Completed',
      service: 'Brake Replacement',
      price: 1200,
      payment: 'Paid',
      deposit: 300
    },
    {
      id: 2,
      category: 'Maintenance',
      date: '2025-05-03',
      status: 'Pending',
      service: 'Oil Change',
      price: 250,
      payment: 'Unpaid',
      deposit: 50
    },
    {
      id: 3,
      category: 'Car Wash',
      date: '2025-05-04',
      status: 'Completed',
      service: 'Exterior Wash',
      price: 100,
      payment: 'Paid',
      deposit: 0
    },
    {
      id: 4,
      category: 'Inspection',
      date: '2025-05-05',
      status: 'Canceled',
      service: 'Vehicle Check',
      price: 500,
      payment: 'Refunded',
      deposit: 100
    },
    {
      id: 5,
      category: 'Repair',
      date: '2025-05-06',
      status: 'In Progress',
      service: 'Engine Repair',
      price: 2000,
      payment: 'Partially Paid',
      deposit: 700
    },
    {
      id: 6,
      category: 'Tire Service',
      date: '2025-05-07',
      status: 'Completed',
      service: 'Tire Rotation',
      price: 300,
      payment: 'Paid',
      deposit: 50
    },
    {
      id: 7,
      category: 'Battery',
      date: '2025-05-08',
      status: 'Pending',
      service: 'Battery Replacement',
      price: 800,
      payment: 'Unpaid',
      deposit: 200
    },
    {
      id: 8,
      category: 'AC Service',
      date: '2025-05-09',
      status: 'Completed',
      service: 'AC Recharge',
      price: 600,
      payment: 'Paid',
      deposit: 100
    },
    {
      id: 9,
      category: 'Cleaning',
      date: '2025-05-10',
      status: 'Completed',
      service: 'Interior Detailing',
      price: 400,
      payment: 'Paid',
      deposit: 0
    },
    {
      id: 10,
      category: 'Glass Work',
      date: '2025-05-11',
      status: 'Canceled',
      service: 'Windshield Replacement',
      price: 1500,
      payment: 'Refunded',
      deposit: 300
    }
  ];
}
