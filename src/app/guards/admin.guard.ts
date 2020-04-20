import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuariosService } from '../services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private usuariosService:UsuariosService) {  }
  canActivate() {
    if(this.usuariosService.usuario.role === 'ADMIN_ROLE') {
      return true
    } else {
      this.usuariosService.logout();
      return false;
    };
  }
  
}
