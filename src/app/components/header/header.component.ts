import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/userservices/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, HttpClientModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [UserService],
  standalone: true,
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  isLoggedIn = true;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollY > 50;
  }

  isclick: boolean = false;
  id: any;
  user: any;
  isLogged = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('id') || sessionStorage.getItem('id');

    if (this.id) {
      this.isLogged = true;

      // Now safe to call getUserByUserId
      this.userService.getUserByUserId(this.id).subscribe(
        (response: any) => {
          this.user = response.data;
        },
        (error: any) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }

  clicked() {
    this.isclick = !this.isclick;
  }

  scrollToSection(sectionId: string) {
  if (this.router.url !== '/') {
    // Navigate to home then scroll
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // wait a bit for DOM to be ready
    });
  } else {
    // Already on home, just scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

  logout() {
  // Clear sessionStorage and localStorage
  sessionStorage.clear();
  localStorage.clear();

  // Optional: redirect user to login page (or home page)
  window.location.href = '/login';  // Change to your desired route
}
}
