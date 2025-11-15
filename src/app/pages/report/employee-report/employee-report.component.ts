import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-employee-report',
  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    BsDatepickerModule
  ],
  templateUrl: './employee-report.component.html',
  styleUrls: ['./employee-report.component.scss']
})
export class EmployeeReportComponent implements OnInit {

  startDate: Date | null = new Date(); 
  endDate: Date | null = new Date(); 

  activeStatus = 'All';
  allVisitors: any[] = [];
  filteredVisitors: any[] = [];
  filteredEmployees: any[];
  allEmployees: any;

  ngOnInit() {
    this.allEmployees = [
      { name: 'Ramesh Jadhav', contact: '9876543210', meetingWith: 'Mr. Sharma', purpose: 'Official Meeting', checkIn: new Date('2025-11-12T10:00:00'), checkOut: new Date('2025-11-10T11:00:00'), status: 'Completed' },
      { name: 'Sunita Patil', contact: '9876543211', meetingWith: 'Ms. Gupta', purpose: 'Interview', checkIn: new Date('2025-11-10T11:30:00'), checkOut: null, status: 'Waiting Approval' },
      { name: 'Anil Pawar', contact: '9876543212', meetingWith: 'Mr. Deshpande', purpose: 'Vendor Discussion', checkIn: new Date('2025-11-09T14:00:00'), checkOut: null, status: 'Approval' },
      { name: 'Priya Shinde', contact: '9876543213', meetingWith: 'Mr. Joshi', purpose: 'Delivery', checkIn: new Date('2025-11-09T15:00:00'), checkOut: new Date('2025-11-09T15:15:00'), status: 'Rejected' }
    ];
   this.filteredEmployees = [...this.allEmployees];
  }



  applyFilter() {
  let tempEmployees = [...this.allEmployees];

  if (this.startDate) {
    const start = new Date(this.startDate);
    start.setHours(0, 0, 0, 0);
    tempEmployees = tempEmployees.filter(v => {
      const checkInDate = new Date(v.checkIn);
      return checkInDate >= start;
    });
  }

  if (this.endDate) {
    const end = new Date(this.endDate);
    end.setHours(23, 59, 59, 999);
    tempEmployees = tempEmployees.filter(v => {
      const checkInDate = new Date(v.checkIn);
      return checkInDate <= end;
    });
  }

  if (this.activeStatus !== 'All') {
    tempEmployees = tempEmployees.filter(v => v.status === this.activeStatus);
  }

  this.filteredEmployees = tempEmployees;
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
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.filteredEmployees);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, `Employee_Report_${new Date().getTime()}.xlsx`);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'badge bg-success';
      case 'Pending': return 'badge bg-warning text-dark';
      case 'Rejected': return 'badge bg-danger';
      case 'In Meeting': return 'badge bg-info text-dark';
      default: return 'badge bg-secondary';
    }
  }
}