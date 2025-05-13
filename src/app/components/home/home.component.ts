<<<<<<< HEAD
import { AfterViewInit, Component, OnInit } from '@angular/core';
=======
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag'; // For the product inventory status
>>>>>>> 83228bd8378858222816f917d41604edd22fb7c5

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
<<<<<<< HEAD
export class HomeComponent implements OnInit{
  start:number=0;
  end:number=0;
commonvendors:any=[
  {
    id:1,
    image:"cars.png",
    category:"Cars Category",
  },
  {
    id:2,
    image:"halls 1.png",
    category:"Photography Category",
  },
  {
    id:3,
    image:"wedding dresses.png",
    category:"Dresses Category",
  },
  {
    id:4,
    image:"halls 1.png",
    category:"Hall Category",
  },

];

ngOnInit() {
  this.updateEnd();
  window.addEventListener('resize', () =>{
    this.start = 0;
    this.updateEnd();
  });
}

updateEnd() {
  const width = window.innerWidth;
  console.log("update",width)
  if (width >= 992) {
    this.end = this.start + 3; 
  } else if (width >= 768) {
    this.end = this.start + 2; 
  } else {
    this.end = this.start + 1;
  }
  
}
Previous():void{
if(this.start >0)
{
  this.start--;
  this.updateEnd();
}


console.log(this.start)
}
Next():void{
if(this.end < this.commonvendors.length)
{
 this.start++;
 this.updateEnd()
}


}
=======
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
>>>>>>> 83228bd8378858222816f917d41604edd22fb7c5


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
