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
    return this.httpclient.get(`http://localhost:3000/services/packages/${id}`,{headers:this.headers})
  }
  addservice(service: FormData): Observable<any> {
  return this.httpclient.post("http://localhost:3000/services/add", service, {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      // لا تضف Content-Type هنا
    })
  });
}
deleteService(id:any):Observable<any>
{
  return this.httpclient.delete(`http://localhost:3000/services/${id}`,{headers:this.headers})
}
getServicesByVendorId(vendorId:any):Observable<any>{
  return this.httpclient.get(`http://localhost:3000/services/${vendorId}`,{headers:this.headers})
}
editService(id:any,service:any):Observable<any>
{
  return this.httpclient.patch(`http://localhost:3000/services/${id}`,service,{
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      // لا تضف Content-Type هنا
    })
  });
}
getAllServices():Observable<any>
{
  return this.httpclient.get(`http://localhost:3000/services/all`,{headers:this.headers});
}
getAllServicesAndPackages(): Observable<any>{
  return this.httpclient.get(`http://localhost:3000/services/servicespackages`, { headers: this.headers });
}
sortServicesByPrice(order:any): Observable<any>{
  return this.httpclient.get(`http://localhost:3000/services/sort?sortBy=${order}`, { headers: this.headers })
}
sortServicesByLikes(): Observable<any>{
  return this.httpclient.get("http://localhost:3000/services/sortlikes", { headers: this.headers });
}
sortServicesByNewest(): Observable<any>{
  return this.httpclient.get("http://localhost:3000/services/sortnewest", { headers: this.headers });
}
addLikeToService(id:any,userId:any): Observable<any>{
  return this.httpclient.patch(`http://localhost:3000/services/like/${id}`,userId,{ headers: this.headers } );
}
updatStatus(id:any,status:any)
{
return this.httpclient.patch(`http://localhost:3000/services/status/${id}`,status,{
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
      // لا تضف Content-Type هنا
    })
  });
}
}
