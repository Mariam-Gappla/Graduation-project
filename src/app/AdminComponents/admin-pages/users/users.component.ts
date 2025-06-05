import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/userservices/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [HttpClientModule,NgClass],
  providers:[UserService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{
  users:any;
  constructor(private userservice: UserService){}

  ngOnInit(): void {
    this.userservice.getUserAndOrders().subscribe((data:any)=>{
      this.users=data.data;
    })
  }
  deleteUser(id:any){
   this.userservice.deleteUserById(id).subscribe((data:any)=>{
    this.userservice.getUserAndOrders().subscribe((data:any)=>{
      this.users=data.data;
    })
   })
  }
}
