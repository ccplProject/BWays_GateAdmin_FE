import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }
  baseUrl: any = environment.baseUrl;


  login(data: any): Observable<any> {
    return this.http.post(this.baseUrl + "api/admin-login", data);
  }
}
