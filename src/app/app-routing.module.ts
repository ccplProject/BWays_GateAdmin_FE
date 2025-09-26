// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './theme/layouts/guest-layout/guest-layout.component';
import { NotFound404 } from './demo/pages/not-found-404/not-found-404';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '/dashboard/default',
      //   pathMatch: 'full'
      // },
      // {
      //   path: '',
      //   redirectTo: '/login',
      //   pathMatch: 'full'
      // },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages-module').then((c) => c.PagesModule)
      },
    ]
  },
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/pages/authentication/auth-login/auth-login.component').then((c) => c.AuthLoginComponent)
      },
      // {
      //   path: 'register',
      //   loadComponent: () =>
      //     import('./demo/pages/authentication/auth-register/auth-register.component').then((c) => c.AuthRegisterComponent)
      // }
    ]
  },
  { path: "**", component: NotFound404 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
