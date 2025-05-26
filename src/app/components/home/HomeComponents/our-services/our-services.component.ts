import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-our-services',
  imports: [RouterModule],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css'
})
export class OurServicesComponent {
  services = [
  {
    image: 'camera.png',
    alt: 'Photography',
    label: 'Photography'
  },
  {
    image: 'wedding-ceremony.png',
    alt: 'Halls',
    label: 'Halls'
  },
  {
    image: 'wedding-suit.png',
    alt: 'Groom Suits',
    label: 'Groom Suits'
  },
  {
    image: 'wedding-dress.png',
    alt: 'Bride Dresses',
    label: 'Bride Dresses'
  },
  {
    image: 'wedding-car.png',
    alt: 'Cars',
    label: 'Cars'
  }
];

}
