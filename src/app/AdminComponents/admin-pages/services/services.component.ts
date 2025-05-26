import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VendorsService } from '../../../services/vendors/vendors.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  imports: [NgClass,HttpClientModule,RouterModule,FormsModule,NgFor],
  providers:[VendorsService],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  vendorsservices:any;
  selectedStatus: string='All'
  constructor(private vendorservices:VendorsService){}
  
  
  

  statuses = ['All', 'Accepted', 'Pending', 'Refused'];
  

  selectStatus(status:any)
  {
    console.log(status);
    this.selectedStatus=status;
    this.filteredServices();
  }
 filteredServices() {
    if (this.selectedStatus === 'All') {
    this.vendorservices.getAllServices().subscribe((data:any)=>{
      this.vendorsservices=data.data;
      console.log(data.data)
    })
    }
    else
    {
      this.vendorservices.getAllServices().subscribe((data:any)=>{
        this.vendorsservices=data.data.filter((service:any)=>service.status===this.selectedStatus);
        
      })
    }
  }
  
  ngOnInit(): void {
    this.vendorservices.getAllServices().subscribe((data:any)=>{
      this.vendorsservices=data.data;
      console.log(data.data)
    })

   
  }
  
}
