import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { VendorsService } from '../../services/vendors/vendors.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-vendor',
  imports: [HttpClientModule,DatePipe],
  providers:[VendorsService],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent implements OnInit{
  vendor:any;
  start:any=0;
  end:any;
constructor(private vendorservice:VendorsService,private route:ActivatedRoute){
  window.addEventListener("resize",()=>{
    this.changeWidth()
  })
}

changeWidth(): void {
  const width = window.innerWidth;

  if (width < 768) {
    this.end = this.start + 1; // موبايل
  } else if (width < 992) {
    this.end = this.start + 2; // تابلت
  } else {
    this.end = this.start + 3; // كمبيوتر
  }
}
next():void{
  
    if(this.end<this.vendor?.serviceImage.length)
    {
        this.start++;
        this.changeWidth();
    }
  

}
prev():void{
  if(this.start > 0)
  {
    this.start--;
    this.changeWidth()
  }

}
ngOnInit(): void {
  this.changeWidth();
  const id=this.route.snapshot.paramMap.get("vendorId");
  this.vendorservice.getVendorById(id).subscribe((res)=>{

    this.vendor=res.data[0];
    
  })
}
}
