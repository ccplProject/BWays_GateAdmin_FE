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
    ///-------- Doctors Count
    this.apiService.getList({
      tablename: "mstpatient",
      view: ["COUNT(*) AS COUNT"],
      condition: {
        STATUS_CODE: 0
      },
    }).subscribe({
      next: (data) => {
        this.AnalyticEcommerce[0] = {
          title: 'Total Patient',
          amount: data?.[0]?.COUNT
        };
      },
      error: (error) => {
        console.error(error);
      }
    });

    ///-------- Patient Count
    this.apiService.getList({
      tablename: "users",
      view: ["COUNT(*) AS COUNT"],
      condition: {
        STATUS_CODE: 0,
        and: { ROLE: 2 }
      },
    }).subscribe({
      next: (data) => {
        this.AnalyticEcommerce[1] = {
          title: 'Total Doctors',
          amount: data?.[0]?.COUNT
        };
      },
      error: (error) => {
        console.error(error);
      }
    });

    ///-------- Medicine Count
    this.apiService.getList({
      tablename: "mstmedicine",
      view: ["COUNT(*) AS COUNT"],
      condition: {
        STATUS_CODE: 0,
      },
    }).subscribe({
      next: (data) => {
        this.AnalyticEcommerce[2] = {
          title: 'Total Medicines',
          amount: data?.[0]?.COUNT
        };
      },
      error: (error) => {
        console.error(error);
      }
    });

    ///-------- Todays Appointment Count
    this.apiService.getList({
      tablename: "transchedule",
      view: ["COUNT(*) AS COUNT"],
      condition: {
        STATUS_CODE: 0,
        and: {
          "DATE(STR_TO_DATE(SCH_TIME, '%Y%m%d%H:%i:%s'))": "CURDATE()"
        }
      },
    }).subscribe({
      next: (data) => {
        this.AnalyticEcommerce[3] = {
          title: "Today's Appointment",
          amount: data?.[0]?.COUNT
        };
      },
      error: (error) => {
        console.error(error);
      }
    });

    ///-------- Recent Patients
    this.apiService.getList({
      tablename: "tranpath",
      view: ["TRAN_NO", "TRAN_DATE", "mstpatient.NAME AS PAT_NAME", "tranpath.SYS_ADDUSER", "tranpath.SYS_ADDTIME", "tranpath.SYS_CHAUSER", "tranpath.SYS_CHATIME"],
      join: [
        {
          "joinType": "LEFT",
          "tablename": "mstpatient",
          "on": "PAT_CODE = mstpatient.CODE"
        }
      ],
      condition: {
        "tranpath.STATUS_CODE": 0
      },
      order: {
        TRAN_NO: "DESC"
      }
    }).subscribe({
      next: (data) => {
        this.recentOrder = data.map(ele => {
          return {
            ...ele,
            SYS_ADDTIME: moment(ele?.SYS_ADDTIME, "YYYYMMDDHH:mm:ss").format("DD-MM-YYYY | HH:mm"),
            TRAN_DATE: moment(ele?.TRAN_DATE, "YYYYMMDD").format("DD-MM-YYYY")
          }
        })
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
