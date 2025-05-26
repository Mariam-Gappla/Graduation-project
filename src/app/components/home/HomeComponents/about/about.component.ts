import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('desc') aboutDesc!: ElementRef;
  @ViewChild('img') aboutImg!: ElementRef;

  private observer!: IntersectionObserver;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      root: null, // This is the viewport
      rootMargin: '0px',
      threshold: 0.3 // Trigger when 30% of the component is visible
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the animation class when the element enters the viewport
          this.aboutDesc.nativeElement.classList.add('animate-in');
          this.aboutImg.nativeElement.classList.add('animate-in');
          observer.disconnect(); // Stop observing once the animation is triggered
        }
      });
    }, options);

    // Start observing the about description and image elements
    this.observer.observe(this.aboutDesc.nativeElement);
    this.observer.observe(this.aboutImg.nativeElement);
  }
}
