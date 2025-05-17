import { Component,OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { VendorsService } from '../../services/vendors/vendors.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgFor } from '@angular/common';
@Component({
  selector: 'app-details',
  imports: [HttpClientModule],
  providers:[VendorsService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
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
      this.end = this.start + 2; // موبايل
    } else if (width < 992) {
      this.end = this.start + 3; // تابلت
    } else {
      this.end = this.start + 4; // كمبيوتر
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
