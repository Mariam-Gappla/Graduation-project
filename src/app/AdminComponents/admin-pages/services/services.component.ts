import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VendorsService } from '../../../services/vendors/vendors.service';

@Component({
  selector: 'app-services',
  imports: [NgClass,HttpClientModule,RouterModule],
  providers:[VendorsService],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  vendorsservices:any;
  constructor(private vendorservices:VendorsService){}
  
  services = [
    { id: 1, category: 'Mechanic', experience: '5 years', status: 'Accepted' },
    { id: 2, category: 'Tow Truck', experience: '3 years', status: 'Refused' },
    { id: 3, category: 'Car Wash', experience: '2 years', status: 'Pending' },
    { id: 1, category: 'Mechanic', experience: '5 years', status: 'Accepted' },
    { id: 2, category: 'Tow Truck', experience: '3 years', status: 'Refused' },
    { id: 3, category: 'Car Wash', experience: '2 years', status: 'Pending' },
    { id: 1, category: 'Mechanic', experience: '5 years', status: 'Accepted' },
    { id: 2, category: 'Tow Truck', experience: '3 years', status: 'Refused' },
    { id: 3, category: 'Car Wash', experience: '2 years', status: 'Pending' },
  ];
  

  statuses = ['All', 'Accepted', 'Pending', 'Refused'];
  selectedStatus = 'All';

  get filteredServices() {
    if (this.selectedStatus === 'All') {
      return this.services;
    }
    return this.services.filter(service => service.status === this.selectedStatus);
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
  }
  ngOnInit(): void {
    this.vendorservices.getAllServices().subscribe((data:any)=>{
      this.vendorsservices=data.data;
      console.log(data.data)
    })

   
  }
}
