import { VendorsService } from './../../services/vendors/vendors.service';
import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-vendors',
  imports: [HttpClientModule,RouterModule],
  providers:[VendorsService],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css'
})
export class VendorsComponent implements OnInit{
  vendors:any;
constructor(private vendorservice:VendorsService,private route:ActivatedRoute){}
category:any
ngOnInit(): void {
this.category=this.route.snapshot.paramMap.get('category')
console.log(this.category)
  this.vendorservice.getVendors(this.category).subscribe((res)=>{
    this.vendors=res.data;
    console.log(this.vendors)
  }
  )

}


}
