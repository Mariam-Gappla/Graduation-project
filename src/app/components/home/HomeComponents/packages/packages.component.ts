import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-packages',
  imports: [NgFor, NgClass,],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css'
})
export class PackagesComponent {
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
}
