// angular import
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// project import
// import tableData from 'src/fake-data/default-data.json';

import { MonthlyBarChartComponent } from 'src/app/theme/shared/apexchart/monthly-bar-chart/monthly-bar-chart.component';
import { IncomeOverviewChartComponent } from 'src/app/theme/shared/apexchart/income-overview-chart/income-overview-chart.component';
import { AnalyticsChartComponent } from 'src/app/theme/shared/apexchart/analytics-chart/analytics-chart.component';
import { SalesReportChartComponent } from 'src/app/theme/shared/apexchart/sales-report-chart/sales-report-chart.component';

// icons
import { IconService, IconDirective } from '@ant-design/icons-angular';
import { FallOutline, GiftOutline, MessageOutline, RiseOutline, SettingOutline } from '@ant-design/icons-angular/icons';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { ApiService } from 'src/app/services/api.service';
import { forkJoin } from 'rxjs';
import * as  moment from 'moment';

@Component({
  selector: 'app-default',
  imports: [
    CommonModule,
    CardComponent,
    // IconDirective,
    /* MonthlyBarChartComponent,
     IncomeOverviewChartComponent,
     AnalyticsChartComponent,
     SalesReportChartComponent*/
  ],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  private iconService = inject(IconService);

  // constructor
  constructor(
    private apiService: ApiService
  ) {
    this.iconService.addIcon(...[RiseOutline, FallOutline, SettingOutline, GiftOutline, MessageOutline]);
  }

  recentOrder: any = [];

  AnalyticEcommerce: [{ title?: string; amount?: string }, { title?: string; amount?: string }, { title?: string; amount?: string }, { title?: string; amount?: string }]
    = [{}, {}, {}, {}]

  ngOnInit() {
  }
}
