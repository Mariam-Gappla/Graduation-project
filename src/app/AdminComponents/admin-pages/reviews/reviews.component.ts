import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-reviews',
  imports: [CarouselModule, ButtonModule, TagModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {
  reviews = [
  {
    name: "Mohamed Ahmed",
    profileImg: 'photographer.jpg',
    experience: '5',
    job: 'Photography',
    summary: 'I am Mohamed Ahmed a passionate professional photographer with 3 years of experience in photography field, work under pressure and bla bla bla blaaaaaaaaaaaaaaaa .',
    services: [
      { service: 'Full day', price: 2500 },
      { service: 'Full day', price: 4000 },
      { service: 'Full day', price: 6000 },
      { service: 'Full day', price: 6000 }
    ],
    images: [
      'a1.jpg',
      'a2.jpg',
      'a3.jpg',
      'a4.jpg',
      'a5.jpg',
      'a7.jpg',
    ],
    address: 'Egypt / Asyut',
    contactInfo: ['+1 555-1234', 'user1@example.com']
  },
  {
        name: "Mohamed Ahmed",
    profileImg: 'photographer.jpg',
    experience: '8 years',
    job: 'Tow Truck Operator',
    summary: 'Reliable and quick roadside assistance.',
    services: [
      { service: 'Towing', price: 100 },
      { service: 'Jump Start', price: 50 },
      { service: 'Lockout Service', price: 70 }
    ],
    images: [
      'a1.jpg',
      'a2.jpg',
      'a3.jpg',
      'a4.jpg',
      'a5.jpg',
      'a7.jpg',
    ],
    address: '456 Elm St, Shelbyville, IL',
    contactInfo: ['+1 555-5678', 'user2@example.com']
  },
  {
        name: "Mohamed Ahmed",
    profileImg: 'photographer.jpg',
    experience: '3 years',
    job: 'Car Equipment Seller',
    summary: 'Wide range of quality car accessories.',
    services: [
      { service: 'Seat Covers', price: 80 },
      { service: 'GPS Installation', price: 120 },
      { service: 'Car Stereo', price: 200 }
    ],
    images: [
      'a1.jpg',
      'a2.jpg',
      'a3.jpg',
      'a4.jpg',
      'a5.jpg',
      'a7.jpg',
    ],
    address: '789 Oak St, Capital City, IL',
    contactInfo: ['+1 555-9012', 'user3@example.com']
  },
  {
        name: "Mohamed Ahmed",
    profileImg: 'https://example.com/profiles/user4.jpg',
    experience: '10 years',
    job: 'Auto Electrician',
    summary: 'Specialist in car electrical systems and wiring.',
    services: [
      { service: 'Battery Replacement', price: 150 },
      { service: 'Wiring Repair', price: 90 },
      { service: 'Light Installation', price: 75 }
    ],
    images: [
      'a1.jpg',
      'a2.jpg',
      'a3.jpg',
      'a4.jpg',
      'a5.jpg',
      'a7.jpg',
    ],
    address: '321 Pine St, Riverdale, IL',
    contactInfo: ['+1 555-2345', 'user4@example.com']
  },
  {
    name: "Mohamed Ahmed",
    profileImg: 'photographer.jpg',
    experience: '7 years',
    job: 'Detailing Specialist',
    summary: 'Professional car cleaning and detailing services.',
    services: [
      { service: 'Exterior Wash', price: 50 },
      { service: 'Interior Detailing', price: 120 },
      { service: 'Wax and Polish', price: 150 }
    ],
    images: [
      'a1.jpg',
      'a2.jpg',
      'a3.jpg',
      'a4.jpg',
      'a5.jpg',
      'a7.jpg',
    ],
    address: '654 Maple St, Greenfield, IL',
    contactInfo: ['+1 555-6789', 'user5@example.com']
  }
];
responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit() {
    this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}


}
