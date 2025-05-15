import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [NgClass],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services = [
    { id: 1, category: 'Mechanic', experience: '5 years', status: 'Accepted' },
    { id: 2, category: 'Tow Truck', experience: '3 years', status: 'Refused' },
    { id: 3, category: 'Car Wash', experience: '2 years', status: 'Pending' },
    { id: 1, category: 'Mechanic', experience: '5 years', status: 'Accepted' },
    { id: 2, category: 'Tow Truck', experience: '3 years', status: 'Refused' },
    { id: 3, category: 'Car Wash', experience: '2 years', status: 'Pending' },
    { id: 1, category: 'Mechanic', experience: '5 years', status: 'Accepted' },
    { id: 2, category: 'Tow Truck', experience: '3 years', status: 'Refused' },
    { id: 3, category: 'Car Wash', experience: '2 years', status: 'Pending' },
  ];
  

  statuses = ['All', 'Accepted', 'Pending', 'Refused'];
  selectedStatus = 'All';

  get filteredServices() {
    if (this.selectedStatus === 'All') {
      return this.services;
    }
    return this.services.filter(service => service.status === this.selectedStatus);
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
  }
}
