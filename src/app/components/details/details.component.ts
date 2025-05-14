import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  imports: [NgFor],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  pricingPackages = [
  {
    title: "Half day session + Limited photos",
    price: "3500 EGP"
  },
  {
    title: "Half day session + Unlimited photos",
    price: "4200 EGP"
  },
  {
    title: "Full day session + Limited photos",
    price: "5000 EGP"
  },
  {
    title: "Full day session + Unlimited photos",
    price: "6000 EGP"
  }
];
reviews = [
  {
    name: 'Sarah Ali',
    date: 'March 2025',
    comment: 'Amazing work! Very professional and creative.',
    image: 'user1.jpg'
  },
  {
    name: 'Ahmed Mostafa',
    date: 'January 2025',
    comment: 'Highly recommend. Made the whole session fun!',
    image: 'user2.jpg'
  },
  {
    name: 'Laila Kamal',
    date: 'December 2024',
    comment: 'Great experience and beautiful photos!',
    image: 'user3.jpg'
  }
];


}
