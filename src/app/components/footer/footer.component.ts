import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PackagesService } from '../../services/packages/packages.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  imports: [RouterModule, HttpClientModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  providers: [PackagesService]
})
export class FooterComponent implements OnInit{
  services = [
  {
    alt: 'Photography',
    label: 'Photography'
  },
  {
    alt: 'Halls',
    label: 'Halls'
  },
  {
    alt: 'Groom Suits',
    label: 'Groom Suits'
  },
  {
    alt: 'Bride Dresses',
    label: 'Bride Dresses'
  },
  {
    alt: 'Cars',
    label: 'Cars'
  }
];
categories: string[] = ['Cars', 'Groom Suits', 'Bride Dresses', 'Photography', 'Halls'];
  randomCategories: string[] = [];
  pcgs: any[] = []; // Or define a proper interface/model for your package
  constructor(private pcgservice: PackagesService) {}

  ngOnInit(): void {
    this.randomCategories = this.getRandomCategories(this.categories, 5);
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
