import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface OrderResponse {
  status: number;
  message: string;
  data: any; // You can replace `any` with a proper Order[] model
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/orders/';

  constructor(private httpclient: HttpClient) { }

  addOrder(orderData: { bookingDate: string; name: string; payment: string; notes: string; packageId: string }): Observable<OrderResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.httpclient.post<OrderResponse>(this.baseUrl, orderData, { headers });
  }

  getAllOrders(): Observable<OrderResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpclient.get<OrderResponse>(this.baseUrl, { headers });
  }

  getOrdersByVendorId(vendorId: string): Observable<OrderResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpclient.get<OrderResponse>(`${this.baseUrl}vendor/${vendorId}`, { headers });
  }
}
