import { Component, OnInit, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/userservices/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterModule, HttpClientModule, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [UserService],
  standalone: true,
})
export class HeaderComponent implements OnInit {
   isCollapsed = true;
  isScrolled = false;
  isclick = false;
  isLogged = false;
  id: any;
  user: any;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.id = localStorage.getItem('id') || sessionStorage.getItem('id');
    if (this.id) {
      this.isLogged = true;
      this.userService.getUserByUserId(this.id).subscribe(
        (res: any) => {
          this.user = res.data;
        },
        (err) => {
          console.error('Error loading user', err);
        }
      );
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const screenWidth = window.innerWidth;
    this.isScrolled = screenWidth >= 992 && scrollY > 50;
  }

  scrollToSection(sectionId: string) {
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  clicked() {
    this.isclick = !this.isclick;
  }

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/login';
  }
}
