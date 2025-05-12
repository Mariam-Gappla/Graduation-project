import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-vendors',
  imports: [NgFor],
  templateUrl: './vendors.component.html',
  styleUrl: './vendors.component.css'
})
export class VendorsComponent {
cards = [
  {
    image: 'photo.jpg',
    name: 'Mohamed Ahmed1',
    experience: 2,
    clients: 15,
    likes: 50,
    bestVendor:0
  },
  {
    image: 'photo.jpg',
    name: 'Mohamed Ahmed',
    experience: 7,
    clients: 30,
    likes: 173,
    bestVendor:1
  },
  {
    image: 'photo.jpg',
    name: 'Mohamed Ahmed',
    experience: 8,
    clients: 8,
    likes: 20,
    bestVendor:0
  },
  {
    image: 'photo.jpg',
    name: 'Mohamed Ahmed',
    experience: 1,
    clients: 20,
    likes: 50,
    bestVendor:0
  },
  {
    image: 'photo.jpg',
    name: 'Mohamed Ahmed',
    experience: 10,
    clients: 38,
    likes: 173,
    bestVendor:0
  },
  {
    image: 'photo.jpg',
    name: 'Mohamed Ahmed',
    experience: 5,
    clients: 30,
    likes: 20,
    bestVendor:0
  },
  {
    image: 'photo.jpg',
    name: 'Mohamed Ahmed',
    experience: 10,
    clients: 38,
    likes: 173,
    bestVendor:0
  },
  {
    image: 'photo.jpg',
    name: 'Mohamed Ahmed',
    experience: 5,
    clients: 30,
    likes: 20,
    bestVendor:0
  }
];
}
