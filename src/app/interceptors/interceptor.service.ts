import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { MessageService } from '../service/message.service';

@Injectable()

export class Interceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(request);

    // Clonar o header
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: 'Bearer ...'
    //   }
    // });

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        this.messageService.showError({ title: 'Erro', message: err.error })
        return new Promise(resolve => { resolve(err) })
      })
    ) as Observable<HttpEvent<any>>;
  }
}
