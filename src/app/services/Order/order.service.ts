import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface OrderResponse {
  status: number;
  message: string;
  data: any; // You can replace `any` with a proper Order[] model
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private baseUrl = 'http://localhost:3000/orders/';

  constructor(private httpclient: HttpClient) {}

  addOrder(orderData: {
    bookingDate: string;
    name: string;
    payment: string;
    notes: string;
    packageId: string;
    method: string;
  }): Observable<OrderResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.httpclient.post<OrderResponse>(this.baseUrl, orderData, {
      headers,
    });
  }

  getAllOrders(): Observable<OrderResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpclient.get<OrderResponse>(this.baseUrl, { headers });
  }
  getAllConfirmedOrders(): Observable<OrderResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpclient.get<OrderResponse>(`${this.baseUrl}confirmed/`, { headers });
  }

  getOrdersByVendorId(vendorId: string): Observable<OrderResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpclient.get<OrderResponse>(
      `${this.baseUrl}vendor/${vendorId}`,
      { headers }
    );
  }
  updateOrderStatus(
    orderId: string,
    status: string
  ): Observable<OrderResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = { status }; // Corrected: status should be part of the body

    return this.httpclient.patch<OrderResponse>(
      `${this.baseUrl}${orderId}/status`,
      body, // Corrected: body goes here
      { headers } // Corrected: headers goes here, as the third argument
    );
  }

  getOrdersByFilters(
  status?: string,
  vendorId?: string
): Observable<OrderResponse> {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  // Build query params string based on provided filters
  let queryParams = [];
  if (status) queryParams.push(`status=${encodeURIComponent(status)}`);
  if (vendorId) queryParams.push(`vendorId=${encodeURIComponent(vendorId)}`);

  const queryString = queryParams.length
    ? `filter?${queryParams.join('&')}`
    : '';

  return this.httpclient.get<OrderResponse>(`${this.baseUrl}${queryString}`, {
    headers,
  });
}
getOrderByUserId(userId: string): Observable<OrderResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpclient.get<OrderResponse>(
      `${this.baseUrl}user/${userId}`,
      { headers }
    );
  }

  // 🗑 Delete order by ID
  deleteOrder(orderId: string): Observable<OrderResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpclient.delete<OrderResponse>(
      `${this.baseUrl}${orderId}`,
      { headers }
    );
  }
  getOrderId(id: string): Observable<OrderResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpclient.get<OrderResponse>(
      `${this.baseUrl}${id}`,
      { headers }
    );
  }
}
