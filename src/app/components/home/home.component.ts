import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  start:number=0;
  end:number=0;
commonvendors:any=[
  {
    id:1,
    image:"cars.png",
    category:"Cars Category",
  },
  {
    id:2,
    image:"halls 1.png",
    category:"Photography Category",
  },
  {
    id:3,
    image:"wedding dresses.png",
    category:"Dresses Category",
  },
  {
    id:4,
    image:"halls 1.png",
    category:"Hall Category",
  },

];

ngOnInit() {
  this.updateEnd();
  window.addEventListener('resize', () =>{
    this.start = 0;
    this.updateEnd();
  });
}

updateEnd() {
  const width = window.innerWidth;
  console.log("update",width)
  if (width >= 992) {
    this.end = this.start + 3; 
  } else if (width >= 768) {
    this.end = this.start + 2; 
  } else {
    this.end = this.start + 1;
  }
  
}
Previous():void{
if(this.start >0)
{
  this.start--;
  this.updateEnd();
}


console.log(this.start)
}
Next():void{
if(this.end < this.commonvendors.length)
{
 this.start++;
 this.updateEnd()
}


}

}
