import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  token:any=localStorage.getItem('token');
  headers= new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });
  constructor(private httpclient:HttpClient) { }
addPackage(id:any,data:any):Observable<any>
{
 return this.httpclient.post(`http://localhost:3000/packages/add/${id}`,data,{headers:this.headers})
}
LowestByCategory(category:string):Observable<any>
{
  return this.httpclient.get(`http://localhost:3000/packages/lowest-by-category/${category}`,{headers:this.headers})
}
}

