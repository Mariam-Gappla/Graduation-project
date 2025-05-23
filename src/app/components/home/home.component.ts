import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag'; // For the product inventory status
import { RouterModule } from '@angular/router';
import { text } from '@fortawesome/fontawesome-svg-core';
@Component({
  selector: 'app-home',
  standalone: true,  // مهم جداً
  imports: [CommonModule, CarouselModule, ButtonModule, TagModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{
  start:any=0;
    end:any;
 productsToshow:any;
constructor(){
   window.addEventListener("resize",()=>{
      this.changeWidth();
      this.start = 0;
    })
}
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
services=[
  {
    title: "Photography",
    image: 'camera.png',
  },
   {
    title: "Halls",
    image: 'wedding-ceremony.png',
  },
  {
    title: "Groom Suits",
    image: 'wedding-suit.png',
  },
  {
    title: "Bride Dresses",
    image: 'wedding-dress.png',
  },
   {
    title: "Cars",
    image: 'wedding-car.png',
  }
  
]

changeWidth(): void {
  const width = window.innerWidth;

  if (width < 768) {
    this.end = this.start + 1; // موبايل
  } else if (width < 992) {
    this.end = this.start + 2; // تابلت
  } else {
    this.end = this.start + 3; // ديسكتوب
  }

  this.productsToshow = this.products.slice(this.start, this.end);
}

next():void{
    
      if(this.end<this.products.length)
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
}

  
  
}
