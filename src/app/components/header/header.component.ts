import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone:true

})
export class HeaderComponent {
isclick:boolean=false;
clicked()
{
  this.isclick=!this.isclick;
}
}
