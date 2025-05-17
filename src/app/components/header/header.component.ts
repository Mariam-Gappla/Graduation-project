import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone:true

})
export class HeaderComponent {
isclick:boolean=false;
id:any
constructor(){
  this.id=localStorage.getItem('id')
}
clicked()
{
  this.isclick=!this.isclick;
}
}
