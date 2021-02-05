import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /*console.log('intercept');*/
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.auth.getToken()}`
            }
        });
        return next.handle(request);
    }
}
