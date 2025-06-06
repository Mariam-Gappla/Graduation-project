import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VendorsService } from '../../services/vendors/vendors.service';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-vendorservices',
  imports: [HttpClientModule,RouterModule,FontAwesomeModule,NgFor],
  providers:[VendorsService],
  templateUrl: './vendorservices.component.html',
  styleUrl: './vendorservices.component.css'
})
export class VendorservicesComponent implements OnInit{
  vendorservice:any;
  vendorId:any;
  faTrash = faTrash;
  faEdit = faEdit;
  faPlus = faPlus;
constructor(private vendorservices:VendorsService){
  this.vendorId=localStorage.getItem('id') || sessionStorage.getItem('id');
}

ngOnInit(): void {

  this.vendorservices.getServicesByVendorId(this.vendorId).subscribe((res)=>{
    this.vendorservice=res.data;
  })

}
deleteService(service:any)
{
return this.vendorservices.deleteService(service._id).subscribe((res)=>{
  this.vendorservices.getServicesByVendorId(this.vendorId).subscribe((res)=>{
    this.vendorservice=res.data;
  })
})
}

}
