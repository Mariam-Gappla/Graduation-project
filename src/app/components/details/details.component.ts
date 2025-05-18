import { Component,OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { VendorsService } from '../../services/vendors/vendors.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(private vendorservice:VendorsService,private route:ActivatedRoute, private router : Router){
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
      console.log(this.vendor);

    })

  }
bookNow(): void {
    // Assuming your booking page route is '/booking' and you want to pass the vendor's ID
    const vendorId = this.route.snapshot.paramMap.get('vendorId');
    if (vendorId) {
      this.router.navigate(['/b-details'], { queryParams: { vendorId: vendorId } });
    } else {
      console.error('Vendor ID not found.');
      // Optionally handle the error, e.g., show a message to the user
    }
  }

}
