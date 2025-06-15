import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private httpclient: HttpClient) {}

  // Always read latest token dynamically:
  private get headers(): HttpHeaders {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Submit payment with FormData (no manual Content-Type)
  submitPayment(formData: FormData): Observable<any> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    return this.httpclient.post('http://localhost:3000/pay', formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  // Get payment by orderId (GET is better than POST for this)
  getPaymentByOrderId(orderId: any): Observable<any> {
    return this.httpclient.get(`http://localhost:3000/pay/order/${orderId}`, {
      headers: this.headers,
    });
  }
  getPaymentByPatmentId(paymentId: any): Observable<any> {
    return this.httpclient.get(`http://localhost:3000/pay/${paymentId}`, {
      headers: this.headers,
    });
  }
  updatePaymentStatusAndNote(paymentId: string, body: { status?: string; note?: string }): Observable<any> {
  return this.httpclient.patch(`http://localhost:3000/pay/${paymentId}/status`, body, {
    headers: this.headers,
  });
}

}
