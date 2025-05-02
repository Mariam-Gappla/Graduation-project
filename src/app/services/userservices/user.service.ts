import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpclient:HttpClient) { }
  
  registeruser(user:any):Observable<any>
  {
    return this.httpclient.post("http://localhost:3000/user/register",user);
  }
  loginUser(user:any):Observable<any>{
    const token=localStorage.getItem('token');
    console.log(token);
   const  headers= new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
    return this.httpclient.post("http://localhost:3000/user/login",user,{headers:headers});
  }
  getAllUsers():Observable<any>{
    return this.httpclient.get("http://localhost:3000/user/allusers");
  }
  updatePassword(user: any, id: any): Observable<any> {
    const token=localStorage.getItem('token');
    return this.httpclient.patch(`http://localhost:3000/user/${id}`, user);
  }
}
