import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag'; // For the product inventory status
import { Router, RouterLink, RouterModule } from '@angular/router';
import { LandingComponent } from './HomeComponents/landing/landing.component';
import { OurServicesComponent } from './HomeComponents/our-services/our-services.component';
import { AboutComponent } from './HomeComponents/about/about.component';
import { PackagesComponent } from './HomeComponents/packages/packages.component';
import { WhyChoosingUsComponent } from './HomeComponents/why-choosing-us/why-choosing-us.component';
import { ContactComponent } from './HomeComponents/contact/contact.component';
import { ReviewService } from '../../services/review/review.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-home',
  standalone: true, // مهم جداً
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    TagModule,
    RouterModule,
    LandingComponent,
    OurServicesComponent,
    AboutComponent,
    PackagesComponent,
    WhyChoosingUsComponent,
    ContactComponent,
    HttpClientModule,
    RouterModule
  ],
  providers: [ReviewService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
    topRatedVendors: any[] = [];
  constructor(private el: ElementRef, private reviewService: ReviewService, private router: Router) {
    window.addEventListener('resize', () => {
      this.changeWidth();
    });
  }
  ngOnInit(): void {
  this.start = 0;

  this.reviewService.getTopRatedVendorsWithTopServiceByCategory().subscribe({
    next: (response) => {
      console.log('Response:', response);
      if (Array.isArray(response)) {
        this.topRatedVendors = response;
        this.changeWidth(); // ✅ Call after assigning data
        console.log('Top Rated Vendors:', this.topRatedVendors);
      } else {
        console.error('Unexpected response format:', response);
      }
    },
    error: (error) => {
      console.error('Error fetching top rated vendors:', error?.message || 'Unknown error');
    }
  });

  // No need to call changeWidth() here before data is fetched
}

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = this.el.nativeElement.querySelectorAll('.item');
            items.forEach((item: HTMLElement, index: number) => {
              setTimeout(() => {
                item.classList.add('animate');
              }, index * 200); // 200ms delay between items
            });
            observer.disconnect(); // Remove if you want it to re-trigger on scroll
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    const target = this.el.nativeElement.querySelector('.services-items');
    if (target) {
      observer.observe(target);
    }
  }

  getSeverity(status: string): string {
    return status === 'In Stock' ? 'success' : 'danger';
  }
  prependNumber = 1;
  appendNumber = 4;

  slides = ['Slide 1', 'Slide 2', 'Slide 3', 'Slide 4'];

  prependTwoSlides() {
    this.slides = [
      `Slide ${--this.prependNumber}`,
      `Slide ${--this.prependNumber}`,
      ...this.slides,
    ];
  }

  appendTwoSlides() {
    this.slides = [
      ...this.slides,
      `Slide ${++this.appendNumber}`,
      `Slide ${++this.appendNumber}`,
    ];
  }
  start: any = 0;
  end: any;
  vendors: any;

  changeWidth(): void {
    const width = window.innerWidth;

    if (width < 768) {
      this.end = this.start + 1; // موبايل
    } else if (width < 992) {
      this.end = this.start + 2; // تابلت
    } else {
      this.end = this.start + 3; // ديسكتوب
    }

    this.vendors = this.topRatedVendors.slice(this.start, this.end);
  }

  next(): void {
    if (this.end < this.topRatedVendors.length) {
      this.start++;
      this.changeWidth();
    }
  }
  prev(): void {
    if (this.start > 0) {
      this.start--;
      this.changeWidth();
    }
  }
  bookNow(service:string): void {
    // Assuming your booking page route is '/booking' and you want to pass the vendor's ID

    if (service) {
      this.router.navigate(['/b-details'], {
        queryParams: { vendorId: service },
      });
    } else {
      console.error('Vendor ID not found.');
      // Optionally handle the error, e.g., show a message to the user
    }
  }
}
