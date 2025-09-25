import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private loader: NgxSpinnerService
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Show loader before request
    this.loader.show();

    // Clone request to attach token
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem(environment.token) || ''}`,
      },
    });
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error intercepted:', error);

        if (error.status === 401) {
          console.error('Unauthorized - Redirecting to login');
          if (req.url.includes('login')) {
            Swal.fire({
              icon: 'error',
              title: 'Unauthorized',
              text: 'Invalid Credentials.',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Unauthorized',
              text: 'You need to log in to access this resource.',
            });
            this.router.navigate(['/login']);
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An unexpected error occurred.',
          });
        }

        return throwError(() => error);
      }),
      finalize(() => {
        // Always hide loader after response (success or error)
        this.loader.hide();
      })
    );
  }
}
