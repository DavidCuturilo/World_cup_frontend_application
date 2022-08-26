import { GenericResponseModel } from './../models/response/generic-response.model';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';

export class ResponseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          const responseModel: GenericResponseModel = event.body;
          if(responseModel.payload) {
            return event.clone({
              body: responseModel.payload,
            });
          } else {
            return event;
          }
        }
        return event;
      })
    );
  }
}
