import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  constructor(private httpclient:HttpClient) { }
  token:any=localStorage.getItem('token');
  headers= new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });
  getVendors(category:any):Observable<any>
  {
   return this.httpclient.get(`http://localhost:3000/services?category=${category}`,{headers:this.headers})
  }
  getVendorById(id:any):Observable<any>
  {
    return this.httpclient.get(`http://localhost:3000/services/${id}`,{headers:this.headers})
  }
}
