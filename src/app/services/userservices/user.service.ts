import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpclient:HttpClient) { }
  token:any=localStorage.getItem('token');
  headers= new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json'
  });
  registeruser(user:any):Observable<any>
  {
    return this.httpclient.post("http://localhost:3000/users/register",user);
  }
  loginUser(user:any):Observable<any>{

    return this.httpclient.post("http://localhost:3000/users/login",user);
  }
  getAllUsers():Observable<any>{
    return this.httpclient.get("http://localhost:3000/users",{headers:this.headers});
  }
  updatePassword(user: any, id: any): Observable<any> {
    return this.httpclient.patch(`http://localhost:3000/users/${id}`, user);
  }
  getUserByRole(role: string): Observable<any>{
    return this.httpclient.get(`http://localhost:3000/users/role?role=${role}`,{headers:this.headers});
  }
  getUserById(id:any):Observable<any>{
    return this.httpclient.delete(`http://localhost:3000/users/${id}`,{headers:this.headers});
  }
  getUserAndOrders():Observable<any>{
    return this.httpclient.get(`http://localhost:3000/users/userorders`,{headers:this.headers});
  }
  deleteUserById(id:any):Observable<any>{
    return this.httpclient.delete(`http://localhost:3000/users/${id}`,{headers:this.headers});
  }
  getServiceById(serviceId: string): Observable<any> {
    return this.httpclient.get(`http://localhost:3000/services/${serviceId}`);
  }

  getUserGrowth(): Observable<any> {
    return this.httpclient.get("http://localhost:3000/users/growth", { headers: this.headers });
  }
  getRoleByUserId(userId: any): Observable<any> {
    return this.httpclient.get(`http://localhost:3000/users/role/${userId}`, { headers: this.headers });
  }
}
