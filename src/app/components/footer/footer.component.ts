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
  constructor() {}

  ngOnInit(): void {

    
  }


}
