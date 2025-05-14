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
    return this.httpclient.post("http://localhost:3000/users/register",user);
  }
  loginUser(user:any):Observable<any>{

    return this.httpclient.post("http://localhost:3000/users/login",user);
  }
  getAllUsers():Observable<any>{
    return this.httpclient.get("http://localhost:3000/users/allusers");
  }
  updatePassword(user: any, id: any): Observable<any> {
    return this.httpclient.patch(`http://localhost:3000/users/${id}`, user);
  }
}
