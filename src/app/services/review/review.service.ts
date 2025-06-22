import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
interface ReviewResponse {
  status: number;
  message: string;
  data: any; // You can replace `any` with a proper Order[] model
}
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private baseUrl = 'http://localhost:3000/reviews/';

  constructor(private httpclient: HttpClient) {}

  addReview(reviewContent: {
    content: string;
    rate: number;
    serviceId: string;
    vendorId: string;
    userId: string;
  }): Observable<ReviewResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
        console.log('headers', headers);

    return this.httpclient.post<ReviewResponse>(this.baseUrl, reviewContent, {headers});
  }
  getReviewsByVendorId(vendorId: string): Observable<ReviewResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log('headers', headers);
    return this.httpclient.get<ReviewResponse>(`${this.baseUrl}${vendorId}`,{ headers });
  }
  getReviewsByServiceId(serviceId: string): Observable<ReviewResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpclient.get<ReviewResponse>(`${this.baseUrl}service/${serviceId}`,{ headers });
  }
  getTopRatedVendorsWithTopServiceByCategory(): Observable<ReviewResponse> {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    // console.log('headers', token);
    return this.httpclient.get<ReviewResponse>(`${this.baseUrl}top-rated/category`, { headers });
  }
}

