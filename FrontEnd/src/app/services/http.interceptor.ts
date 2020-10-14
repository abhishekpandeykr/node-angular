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

@Injectable()
export class HttpsInterceptor implements HttpInterceptor {
  constructor() {}

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
    console.log('header', modifiedReq.headers);
    return next.handle(modifiedReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          // Modify the response
          if (event.url.endsWith('/signin')) {
            localStorage.setItem('authToken', event.body.token);
            localStorage.setItem('isLoggedIn', 'true');
          }
        }
      })
    );
  }
}
