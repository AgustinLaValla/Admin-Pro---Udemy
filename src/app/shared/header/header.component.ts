import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(public usuariosService:UsuariosService) {
    this.usuario = this.usuariosService.usuario;
   }

  ngOnInit() { };

  logout() { 
    this.usuariosService.logout();
  };

};
