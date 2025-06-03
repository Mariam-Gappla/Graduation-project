import { Component, OnInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/userservices/user.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  imports: [RouterModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [UserService],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollY > 50;
  }
  
  isclick: boolean = false;
  id: any;
  role: any;

  constructor(private userService: UserService) {

  }
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.userService.getRoleByUserId(this.id).subscribe(
      (response: any) => {
        this.role = response.role;
        console.log('User role:', this.role);
      },
      (error: any) => {
        console.error('Error fetching user role:', error);
      }
    );
  }
  clicked() {
    this.isclick = !this.isclick;
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
