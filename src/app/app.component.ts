import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { ErrorComponent } from './components/error/error.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 check:boolean=false;
 constructor(){
}
checkcompnent(component:any){
if(component instanceof LoginComponent || component instanceof SignupComponent || component instanceof ErrorComponent)
{
  this.check=true;
}
else
{
  this.check=false;
}

}
}
