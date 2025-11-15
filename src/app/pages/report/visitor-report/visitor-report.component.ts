import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-visitor-report',
  standalone: true,
  imports: [CommonModule, FormsModule,BsDatepickerModule],
  templateUrl: './visitor-report.component.html',
  styleUrls: ['./visitor-report.component.scss']
})
export class VisitorReportComponent implements OnInit {
 startDate: Date | null = new Date(); 
  endDate: Date | null = new Date(); 


  activeStatus = 'All';
  allVisitors: any[] = [];
  filteredVisitors: any[] = [];
  filteredEmployees: any[];
  allVisitorss: any;
  allEmployees: any;

  ngOnInit() {
    this.allVisitors = [
      { name: 'Ramesh Jadhav', contact: '9876543210', meetingWith: 'Mr. Sharma', purpose: 'Official Meeting', checkIn: new Date('2025-11-12T10:00:00'), checkOut: new Date('2025-11-10T11:00:00'), status: 'Completed' },
      { name: 'Sunita Patil', contact: '9876543211', meetingWith: 'Ms. Gupta', purpose: 'Interview', checkIn: new Date('2025-11-10T11:30:00'), checkOut: null, status: 'In Meeting' },
      { name: 'Anil Pawar', contact: '9876543212', meetingWith: 'Mr. Deshpande', purpose: 'Vendor Discussion', checkIn: new Date('2025-11-09T14:00:00'), checkOut: null, status: 'Pending' },
      { name: 'Priya Shinde', contact: '9876543213', meetingWith: 'Mr. Joshi', purpose: 'Delivery', checkIn: new Date('2025-11-09T15:00:00'), checkOut: new Date('2025-11-09T15:15:00'), status: 'Rejected' }
    ];
    this.filteredVisitors = [...this.allVisitors];
  }

  applyFilter() {
  
  let tempVisitors = [...this.allVisitors];

  
  if (this.startDate) {
    const start = new Date(this.startDate);
    start.setHours(0, 0, 0, 0);
    tempVisitors = tempVisitors.filter(v => new Date(v.checkIn) >= start);
  }

 
  if (this.endDate) {
    const end = new Date(this.endDate);
    end.setHours(23, 59, 59, 999);
    tempVisitors = tempVisitors.filter(v => new Date(v.checkIn) <= end);
  }

  
  if (this.activeStatus !== 'All') {
    tempVisitors = tempVisitors.filter(v => v.status === this.activeStatus);
  }

  
  this.filteredVisitors = tempVisitors;
}


filterByStatus(status: string) {
  this.activeStatus = status;

 
  if (status === 'All') {
    this.startDate = null;
    this.endDate = null;
  }
  
  
  this.applyFilter();
}

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredVisitors);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Visitors');
    XLSX.writeFile(wb, `Visitor_Report_${new Date().getTime()}.xlsx`);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'badge bg-success';
      case 'Pending': return 'badge bg-warning';
      case 'Rejected': return 'badge bg-danger';
      case 'In Meeting': return 'badge bg-info';
      default: return 'badge bg-secondary';
    }
  }
}
