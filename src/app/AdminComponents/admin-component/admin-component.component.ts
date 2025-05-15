import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../admin-pages/home/home.component';
import { ServicesComponent } from '../admin-pages/services/services.component';
import { BookingsComponent } from '../admin-pages/bookings/bookings.component';
import { ReviewsComponent } from '../admin-pages/reviews/reviews.component';
import { UsersComponent } from '../admin-pages/users/users.component';
import { StatisticsComponent } from '../admin-pages/statistics/statistics.component';

// Declare Bootstrap globally
declare var bootstrap: any;

@Component({
  selector: 'app-admin-component',
  standalone: true,
  imports: [HomeComponent, ServicesComponent, BookingsComponent, ReviewsComponent, UsersComponent, StatisticsComponent],
  templateUrl: './admin-component.component.html',
  styleUrls: ['./admin-component.component.css']
})
export class AdminComponentComponent implements OnInit {
  activeTab: string = 'home';

  ngOnInit(): void {
    // Add event listeners to the sidebar links (expanded state)
    const expandedNavLinks = document.querySelectorAll('.offcanvas-body .nav-item a');
    expandedNavLinks.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('data-target');
        if (targetId) {
          this.setActiveTab(targetId);
          const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('sidebarMenu')!);
          offcanvas?.hide();
        }
      });
    });

    // Add event listeners to the icon bar links (closed state)
    const iconBarLinks = document.querySelectorAll('.iconsnav .tabs a:not(.open-icon)');
    iconBarLinks.forEach((link, index) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        // Determine the target ID based on the index of the icon
        const targetIds = ['home', 'service', 'booking', 'users', 'reviews', 'statistics'];
        if (index < targetIds.length) {
          this.setActiveTab(targetIds[index]);
        }
      });
    });

    // Add event listener for the open sidebar icon
    const openIcon = document.querySelector('.open-icon');
    openIcon?.addEventListener('click', () => {
      const offcanvas = new bootstrap.Offcanvas('#sidebarMenu');
      offcanvas.show();
    });
  }

  setActiveTab(tabId: string) {
    // Hide all tab content divs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(div => {
      (div as HTMLElement).style.display = 'none';
    });

    // Show the selected tab content div
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
      (activeContent as HTMLElement).style.display = 'block';
    }

    this.activeTab = tabId;
  }
}
