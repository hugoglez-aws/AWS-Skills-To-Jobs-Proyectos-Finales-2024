import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let cloneRequest = request;

    if (sessionStorage.getItem("token")) {
      cloneRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`!
        }
      })
    }

    return next.handle(cloneRequest);
  }
}
