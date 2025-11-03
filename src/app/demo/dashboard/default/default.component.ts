import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { 
  TeamOutline, 
  UserOutline, 
  ClockCircleOutline, 
  CalendarOutline,
  RiseOutline,
  QrcodeOutline,
  BarsOutline,
  CheckCircleOutline,
  CloseCircleOutline,
  LoadingOutline
} from '@ant-design/icons-angular/icons';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
import { DashboardStats } from '../models/dashboard.model';

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    IconDirective,
    RouterModule
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit, OnDestroy {
  dashboardData: DashboardStats | null = null;
  refreshInterval: any;

  constructor(
    private apiService: ApiService,
    private iconService: IconService
  ) {
    this.iconService.addIcon(...[
      TeamOutline,
      UserOutline,
      ClockCircleOutline,
      CalendarOutline,
      RiseOutline,
      QrcodeOutline,
      BarsOutline,
      CheckCircleOutline,
      CloseCircleOutline,
      LoadingOutline
    ]);
  }

  ngOnInit() {
    this.loadDashboardData();
    // Auto refresh every 30 seconds
    this.refreshInterval = setInterval(() => {
      this.loadDashboardData();
    }, 30000);
  }

  ngOnDestroy() {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadDashboardData() {
    this.apiService.GET('api/dashboard-stats').subscribe({
      next: (data: DashboardStats) => {
        this.dashboardData = data;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
      }
    });
  }

  get summaryCards() {
    if (!this.dashboardData) return [];

    return [
      {
        title: 'Total Employees',
        count: this.dashboardData.totalEmployees,
        icon: 'team',
        color: 'primary',
        trend: '+5%'
      },
      {
        title: "Today's Visitors",
        count: this.dashboardData.totalVisitors.today,
        icon: 'user',
        color: 'success',
        trend: '+12%'
      },
      {
        title: 'Weekly Visitors',
        count: this.dashboardData.totalVisitors.week,
        icon: 'calendar',
        color: 'warning',
        trend: '+8%'
      },
      {
        title: 'Total Visitors',
        count: this.dashboardData.totalVisitors.total,
        icon: 'bars',
        color: 'info',
        trend: '+15%'
      },
      {
        title: "Today's Employee Gate Passes",
        count: this.dashboardData.totalEmployeeGatePasses.today,
        icon: 'check-circle',
        color: 'secondary',
        trend: '+10%'
      },
      {
        title: 'Weekly Employee Gate Passes',
        count: this.dashboardData.totalEmployeeGatePasses.week,
        icon: 'clock-circle',
        color: 'dark',
        trend: '+7%'
      },
      {
        title: 'Total Employee Gate Passes',
        count: this.dashboardData.totalEmployeeGatePasses.total,
        icon: 'rise',
        color: 'danger',
        trend: '+20%'
      }
    ];
  }

  getStatusBadgeClass(status: string): string {
    switch (status?.toUpperCase()) {
      case 'CLOSED':
        return 'bg-success';
      case 'PENDING':
        return 'bg-warning';
      case 'IN PREMISES':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }

  formatDate(time:   string, TRAN_DATE:string = moment().format("YYYYMMDD")): string {
    return moment(`${TRAN_DATE}${time}`, "YYYYMMDDHHmm").format('DD MMM YYYY, hh:mm A');
  }

  formatShortDate(date: Date | string): string {
    return moment(date).format('DD MMM YYYY');
  }

  getDepartmentPercentage(count: number): number {
    if (!this.dashboardData) return 0;
    const total = this.dashboardData.visitorsByDepartment.reduce((sum, dept) => sum + dept.COUNT, 0);
    return (count / total) * 100;
  }
}

