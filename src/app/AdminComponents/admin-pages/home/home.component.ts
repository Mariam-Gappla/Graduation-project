import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { UserService } from '../../../services/userservices/user.service';
import { VendorsService } from '../../../services/vendors/vendors.service';

@Component({
  selector: 'app-home',
  imports: [HttpClientModule],
  providers:[UserService,VendorsService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  vendors:any;
  brides:any;
  users:any;
  services:any;
  constructor(private userservice:UserService,private vendorservices:VendorsService){}
  bookings = [
  { name: 'Alice', date: '2025-05-01', price: 100.50 },
  { name: 'Bob', date: '2025-05-02', price: 75.00 },
  { name: 'Charlie', date: '2025-05-03', price: 120.25 },
  { name: 'Diana', date: '2025-05-04', price: 90.00 },
  { name: 'Alice', date: '2025-05-01', price: 100.50 },
  { name: 'Bob', date: '2025-05-02', price: 75.00 },
  { name: 'Charlie', date: '2025-05-03', price: 120.25 },
  { name: 'Diana', date: '2025-05-04', price: 90.00 }
];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };
ngOnInit(): void {
  this.userservice.getAllUsers().subscribe((data:any)=>{
    console.log(data);
    this.users=data.data?.length || 0;
  });
  this.userservice.getUserByRole('Vendor').subscribe((data:any)=>{
   this.vendors=data.data?.length || 0;
  });
  this.userservice.getUserByRole('Bride/Groom').subscribe((data:any)=>{
    this.brides=data.data?.length || 0;
  });
  this.vendorservices.getAllServices().subscribe((data:any)=>{
     this.services=data.data.length || 0;
  })
  
}
}
