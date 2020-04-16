import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private usuariosService: UsuariosService, private router:Router) { }
  canActivate(): boolean {
    if(this.usuariosService.isLogged()){
      return true
    } else {
      this.router.navigate(['/login']);
      return false;
    };
  }
  
}
