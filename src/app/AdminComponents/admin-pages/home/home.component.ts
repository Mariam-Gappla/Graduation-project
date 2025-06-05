import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexYAxis,
  NgApexchartsModule
} from "ng-apexcharts";

import { ChartConfiguration, ChartType } from 'chart.js'; // Note: Chart.js imports are present but NgApexchartsModule is used for the line chart.
import { UserService } from '../../../services/userservices/user.service';
import { VendorsService } from '../../../services/vendors/vendors.service';
import { OrderService } from '../../../services/Order/order.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis?: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgApexchartsModule, DatePipe], // Added DatePipe to imports as it's used in the template (though not directly in this snippet, it's good practice for standalone components)
  providers: [UserService, VendorsService, OrderService, DatePipe],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Get a reference to the ApexCharts component
  @ViewChild("chart") chart: ChartComponent | undefined;

  public chartOptions: ChartOptions;

  vendors: number = 0;
  brides: number = 0;
  users: number = 0;
  bookings: any[] = [];
  bookingsCount: number = 0;
  cBookingsCount: number = 0;
  services: number = 0;

  constructor(
    private userservice: UserService,
    private vendorservices: VendorsService,
    private orderservice: OrderService,
    private datePipe: DatePipe
  ) {
    this.chartOptions = {
  series: [
    {
      name: "User Growth",
      data: []
    }
  ],
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false
    },
    background: "#f9f9f9", // Soft background color
    toolbar: {
      show: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: "smooth", // Smooth line
    colors: ['#4e73df'], // Soft blue line
    width: 3
  },
  title: {
    text: "User Growth by Month",
    align: "left",
    style: {
      fontSize: '18px',
      color: '#2c3e50' // Softer dark blue-gray
    }
  },
  grid: {
    borderColor: '#e0e0e0', // Soft gray grid border
    row: {
      colors: ['#ffffff', '#f2f2f2'], // Light row alternation
      opacity: 0.5
    },
    xaxis: {
      lines: {
        show: false
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  xaxis: {
    categories: [],
    labels: {
      style: {
        colors: '#555', // Soft gray
        fontSize: '12px'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#555',
        fontSize: '12px'
      }
    }
  }
};

  }

  // Chart.js configurations (these are not used for the ApexChart but are part of the original code)
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  ngOnInit(): void {
    // Fetch total users
    this.userservice.getAllUsers().subscribe((data: any) => {
      this.users = data?.data?.length || 0;
    });

    // Fetch vendor count
    this.userservice.getUserByRole('Vendor').subscribe((data: any) => {
      this.vendors = data?.data?.length || 0;
    });

    // Fetch bride/groom count
    this.userservice.getUserByRole('Bride/Groom').subscribe((data: any) => {
      this.brides = data?.data?.length || 0;
    });

    // Fetch services count
    this.vendorservices.getAllServices().subscribe((data: any) => {
      this.services = data?.data?.length || 0;
    });

    // Fetch total bookings count
    this.orderservice.getAllOrders().subscribe((data: any) => {
      this.bookingsCount = data?.data?.length || 0;
    });

    // Fetch confirmed bookings and limit to 10 for display
    this.orderservice.getAllConfirmedOrders().subscribe((data: any) => {
      const allBookings = data?.data || [];
      this.cBookingsCount = allBookings.length;
      this.bookings = allBookings.slice(0, 10);
    });

    // Get user growth by month and update the chart
    this.userservice.getUserGrowth().subscribe((data: any) => {
      const userGrowth = data?.data || [];
      // Format month strings for x-axis categories
      const months = userGrowth.map((item: any) =>
        this.datePipe.transform(item.month + '-01', 'MMM y')
      );
      console.log('Formatted Months for Chart:', months);
      const counts = userGrowth.map((item: any) => item.count);
      console.log('User Counts for Chart:', counts);

      // Update chart options
      this.chartOptions.xaxis.categories = months;
      this.chartOptions.series = [{
        name: 'User Growth',
        data: counts
      }];

      // Manually update the chart to reflect the new options
      // This is crucial for ensuring the chart re-renders with dynamic data
      this.chart?.updateOptions(this.chartOptions);
    });
  }
}
