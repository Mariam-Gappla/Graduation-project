import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PackagesService } from '../../../../services/packages/packages.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [NgFor, NgClass, HttpClientModule,RouterModule],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.css',
  providers: [PackagesService]
})
export class PackagesComponent implements OnInit {
  categories: string[] = ['Cars', 'Groom Suits', 'Bride Dresses', 'Photography', 'Halls'];
  randomCategories: string[] = [];
  pcgs: any[] = []; // Or define a proper interface/model for your package
  constructor(private pcgservice: PackagesService) {}

  ngOnInit(): void {
    this.randomCategories = this.getRandomCategories(this.categories, 3);
    console.log('Random Categories:', this.randomCategories);

    this.randomCategories.forEach((category) => {
      this.pcgservice.LowestByCategory(category).subscribe(
        (data) => {
          if (data) this.pcgs.push(data);

        },
        (error) => {
          console.error(`Error fetching lowest package for category ${category}:`, error);
        }
      );
    });
    console.log('Packages:', this.pcgs);
  }

  getRandomCategories(arr: string[], count: number): string[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
