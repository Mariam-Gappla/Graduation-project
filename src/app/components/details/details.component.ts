import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { VendorsService } from '../../services/vendors/vendors.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ReviewService } from '../../services/review/review.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-details',
  imports: [HttpClientModule, FormsModule, NgClass, NgFor, NgIf],
  providers: [VendorsService, ReviewService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  vendor: any;
  start: any = 0;
  end: any;
  userId: any;
  reviews: any;
  showedImages: any;
  images: any;
  showReviewForm = false;
  newReview = {
    rating: '',
    content: '',
  };
  constructor(
    private vendorservice: VendorsService,
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewService
  ) {
    window.addEventListener('resize', () => {
      this.changeWidth();
      this.start = 0;
    });
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
  next(): void {
    if (this.end < this.vendor?.serviceImage.length) {
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
  ngOnInit(): void {
    this.userId = localStorage.getItem('id') || sessionStorage.getItem('id');

    this.changeWidth();
    const id = this.route.snapshot.paramMap.get('vendorId');
    this.vendorservice.getVendorById(id).subscribe((res) => {
      this.vendor = res.data;
      this.images = this.vendor.serviceImage;
      // // console.log(this.vendor);
      // // console.log(this.images);
      this.reviewService
        .getReviewsByServiceId(this.vendor._id)
        .subscribe((res) => {
          this.reviews = res;
          // // console.log('Full Review Response Keys:', this.reviews);
        });
    });
  }
  bookNow(): void {
    // Assuming your booking page route is '/booking' and you want to pass the vendor's ID
    const vendorId = this.route.snapshot.paramMap.get('vendorId');
    if (vendorId) {
      this.router.navigate(['/b-details'], {
        queryParams: { vendorId: vendorId },
      });
    } else {
      console.error('Vendor ID not found.');
      // Optionally handle the error, e.g., show a message to the user
    }
  }
  submitReview() {
  if (!this.userId) {
    Swal.fire({
      icon: 'warning',
      title: 'تنبيه',
      text: 'يجب عليك تسجيل الدخول لتتمكن من إضافة مراجعة',
      confirmButtonText: 'حسنًا',
    });
    return;
  }

  if (this.newReview.rating && this.newReview.content) {
    const reviewData = {
      content: this.newReview.content,
      rate: Number(this.newReview.rating),
      serviceId: this.vendor._id,
      vendorId: this.vendor.vendorId || this.vendor._id,
      userId: this.userId,
    };

    this.newReview = { rating: '', content: '' };
    this.showReviewForm = false;

    this.reviewService.addReview(reviewData).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'تمت الإضافة',
          text: 'تمت إضافة المراجعة بنجاح',
          confirmButtonText: 'موافق',
        });

        this.vendorservice.getVendorById(this.vendor._id).subscribe((res) => {
          this.vendor = res.data;
        });
      },
      error: (err) => {
        console.error('Error adding review:', err);
        Swal.fire({
          icon: 'error',
          title: 'خطأ',
          text: 'فشل في إضافة المراجعة',
          confirmButtonText: 'موافق',
        });
      },
    });
  }
}

  // لتحويل رقم التقييم إلى مصفوفة بعدد النجوم
  getStarsArray(rate: number): number[] {
    return Array(rate).fill(0);
  }

  // لتحسين الأداء باستخدام trackBy
  trackReview(index: number, review: any): any {
    return review._id || index;
  }
  toggleHeart() {
    // // console.log('toggle');
    this.vendorservice
      .addLikeToService(this.vendor._id, { userId: this.userId })
      .subscribe((res) => {
        // // console.log(res);
        const id = this.route.snapshot.paramMap.get('vendorId');
        this.vendorservice.getVendorById(id).subscribe((res) => {
          this.vendor = res.data;
          // // console.log(this.vendor.vendorId);
          this.reviewService
            .getReviewsByVendorId(this.vendor.vendorId)
            .subscribe((res) => {
              this.reviews = res;
              // // console.log('Full Review Response Keys:', this.reviews);
            });
        });
      });
  }
}
