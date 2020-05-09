import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private usuariosService:UsuariosService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json', 
      'token': this.usuariosService.token 
    });

    const reqClone = req.clone({
      headers
    });


    if(req.url === 'http://localhost:3000/login/google') return next.handle(req);
    if(req.url.indexOf('upload') > 0) return next.handle(req);

    return next.handle(reqClone);
  }
  
}