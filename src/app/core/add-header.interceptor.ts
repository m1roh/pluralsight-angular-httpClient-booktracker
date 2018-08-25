import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from '../../../node_modules/rxjs';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`AddHeaderInterceptor - ${req.url}`);

    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    return next.handle(jsonReq);
  }

}
