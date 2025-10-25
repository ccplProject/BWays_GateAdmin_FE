// project import
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-login',
  imports: [RouterModule, CommonModule, FormsModule],
  providers: [ApiService],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {

  userId: string = "";
  password: string = "";

  showBrand: boolean = environment.showBrand;
  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    if (!environment.production) {
      this.userId = "shubhamsawant.workplace@gmail.com";
      this.password = "123456789";
    }
  }

  onLogin() {
    if (this.userId && this.password) {
      this.apiService.login({
        MAIL: this.userId,
        PASSWORD: this.password
      }).subscribe({
        next: (res: any) => {
          debugger
          localStorage.setItem(environment.token, res.token);
          localStorage.setItem(environment.key, res.user?.COMPANY_CODE?.UNIQUE_TOKEN);
          localStorage.setItem(environment.userData, JSON.stringify(res.user));
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {

        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please enter both User ID and Password.'
      });
    }
  }
}
