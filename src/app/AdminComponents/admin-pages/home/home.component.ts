import { Component } from '@angular/core';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  bookings = [
  { name: 'Alice', date: '2025-05-01', price: 100.50 },
  { name: 'Bob', date: '2025-05-02', price: 75.00 },
  { name: 'Charlie', date: '2025-05-03', price: 120.25 },
  { name: 'Diana', date: '2025-05-04', price: 90.00 },
  { name: 'Alice', date: '2025-05-01', price: 100.50 },
  { name: 'Bob', date: '2025-05-02', price: 75.00 },
  { name: 'Charlie', date: '2025-05-03', price: 120.25 },
  { name: 'Diana', date: '2025-05-04', price: 90.00 }
];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025', '2026'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };
}
