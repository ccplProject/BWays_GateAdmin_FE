import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound404 } from '../demo/pages/not-found-404/not-found-404';
import { Employee } from './employee/employee';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'smart_table/:id',
    loadComponent: () => import('./smart-table/smart-table').then((c) => c.SmartTable)
  },
  {
    path: 'employee',
    loadComponent: () => import('./employee/employee').then((c) => c.Employee)
  },
  {
    path: 'print-qr',
    loadComponent: () => import('./print-qr/print-qr').then((c) => c.PrintQr)
  },
  {
    path: 'department',
    loadComponent: () => import('./department/department').then((c) => c.Department)
  },
  {
    path: 'report/visitor-report',
    loadComponent: () => import('./report/visitor-report/visitor-report.component')
      .then(c => c.VisitorReportComponent)
  },
  {
    path: 'report/employee-report',
  loadComponent: () =>
    import('./report/employee-report/employee-report.component')
      .then(c => c.EmployeeReportComponent)
},


  { path: '**', component: NotFound404 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
