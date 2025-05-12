import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag'; // For the product inventory status

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 1
  },
  {
    breakpoint: '768px',
    numVisible: 2,
    numScroll: 1
  },
  {
    breakpoint: '560px',
    numVisible: 1,
    numScroll: 1
  }
];
  packages = [
  {
    price: 10000,
    items: ['Half day session', 'Full day session', 'Weekend session']
  },
  {
    price: 15000,
    items: ['Half day session', 'Night session', 'Outdoor session']
  },
  {
    price: 20000,
    items: ['Full day', 'Video shoot', 'Drone coverage','Full day', 'Video shoot', 'Drone coverage']
  },


];

  products = [
    {
      category: "Dresses Category",
      image: 'weddingdresses.jpg',
    },
    {
      category: "Photography Category",
      image: 'halls.jpg',
    },
    {
      category: "Cars Category",
      image: 'cars.jpg',
    },
    {
      category: "Dresses Category",
      image: 'weddingdresses.jpg',
    },
    {
      category: "Photography Category",
      image: 'halls.jpg',
    },
    {
      category: "Cars Category",
      image: 'cars.jpg',
    },
  ];

  

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

  prependOneSlide() {
    this.slides = [`Slide ${--this.prependNumber}`, ...this.slides];
  }

  appendOneSlide() {
    this.slides = [...this.slides, `Slide ${++this.appendNumber}`];
  }

  appendTwoSlides() {
    this.slides = [
      ...this.slides,
      `Slide ${++this.appendNumber}`,
      `Slide ${++this.appendNumber}`,
    ];
  }
}
