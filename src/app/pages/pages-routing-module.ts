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

  { path: "**", component: NotFound404 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
