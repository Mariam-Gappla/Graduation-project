import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { VendorsService } from '../../../services/vendors/vendors.service';
import Swal from 'sweetalert2';
import { error } from 'jquery';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-reviews',
  imports: [CarouselModule, ButtonModule, TagModule, HttpClientModule],
  providers: [VendorsService],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  constructor(private vendorservices: VendorsService) { }
  services: any;

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
  alerrtSucess(title: string, text: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      confirmButtonText: "ok",
      customClass: {
        popup: 'custom-swal-popup',
      }
    })
  }
  alertFail(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      confirmButtonText: "ok",
      customClass: {
        popup: 'custom-swal-popup',
      }
    })
  }
  getAllServices() {
    this.vendorservices.getAllServicesAndPackages().subscribe((data: any) => {
      this.services = data.data;
      console.log(data);
    })
  }
  ngOnInit() {
    this.getAllServices();
  }
  updateStatus(serviceId: string, status: string) {
    this.vendorservices.updatStatus(serviceId, { status: status }).subscribe(
      (res: any) => {

          if (status === 'Accepted') {
            this.getAllServices();
            this.alerrtSucess("Success", "Service Accepted successfully");
          } else if (status === 'Refused') {
            this.alerrtSucess("Success", "Service Refused successfully");
          }
      },
      (error: any) => {
        this.alertFail("Error", error.error.message)
      })
  }
}



