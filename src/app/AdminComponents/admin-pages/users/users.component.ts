import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', bookings: 12 },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Customer', bookings: 5 },
    { id: 3, name: 'Ali Hassan', email: 'ali@example.com', role: 'Mechanic', bookings: 8 },
    { id: 4, name: 'Lina Kim', email: 'lina@example.com', role: 'Customer', bookings: 3 },
    { id: 5, name: 'Omar Farouk', email: 'omar@example.com', role: 'Seller', bookings: 2 },
    { id: 6, name: 'Maya Tran', email: 'maya@example.com', role: 'Admin', bookings: 6 },
    { id: 7, name: 'Ahmed Zaki', email: 'ahmed@example.com', role: 'Customer', bookings: 9 },
    { id: 8, name: 'Julia Stone', email: 'julia@example.com', role: 'Mechanic', bookings: 4 },
    { id: 9, name: 'Carlos Diaz', email: 'carlos@example.com', role: 'Customer', bookings: 7 },
    { id: 10, name: 'Rita Singh', email: 'rita@example.com', role: 'Seller', bookings: 1 },
    { id: 11, name: 'Chen Wang', email: 'chen@example.com', role: 'Customer', bookings: 10 },
    { id: 12, name: 'Fatima Noor', email: 'fatima@example.com', role: 'Mechanic', bookings: 11 },
    { id: 13, name: 'Elijah Brown', email: 'elijah@example.com', role: 'Admin', bookings: 14 },
    { id: 14, name: 'Nina Petrova', email: 'nina@example.com', role: 'Customer', bookings: 6 },
    { id: 15, name: 'Khaled Youssef', email: 'khaled@example.com', role: 'Seller', bookings: 3 }
  ];
}
