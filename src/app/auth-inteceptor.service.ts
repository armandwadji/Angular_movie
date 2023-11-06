import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInteceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const TOKEN = "0d35c2af84390857eb8ff45e611f310d";

    const authReq = request.clone({
      setParams: {
        api_key: TOKEN
      }
    });

    return next.handle(authReq);
  }

  
}
