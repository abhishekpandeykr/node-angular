import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { ToastrService } from 'ngx-toastr';
declare var localStorage;

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  constructor(private toaster: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let modifiedReq = request;
    if (!modifiedReq.url.endsWith('/signin')) {
      const token = `Bearer ${localStorage.getItem('authToken')}`;
      modifiedReq = modifiedReq.clone({
        setHeaders: { Authorization: token },
      });
    }
    return next.handle(modifiedReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // Modify the response
          if (event.url.endsWith('/signin')) {
            localStorage.setItem('authToken', event.body.token);
            localStorage.setItem('isLoggedIn', 'true');
          } else {
            this.showSuccess(modifiedReq, event.body);
          }
        }
      })
    );
  }

  showSuccess(req: HttpRequest<unknown>, event) {
    if (event.body && event.body.errors && event.body.errors.length) {
      this.toaster.error('Error', 'Something Went Wrong');
    } else if (req.method === 'POST') {
      this.toaster.success('Success', 'Created SuccessFully');
    } else if (req.method === 'PUT') {
      this.toaster.success('Success', 'Updated SuccessFully');
    } else if (req.method === 'DELETE') {
      this.toaster.success('Success', 'Deleted SuccessFully');
    }
  }
}
