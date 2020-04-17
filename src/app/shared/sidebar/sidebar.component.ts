import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public usuario: Usuario;

  constructor(public sidebar: SidebarService, public usuariosService: UsuariosService) { 
    this.usuario = this.usuariosService.usuario;
  }

  ngOnInit() { }

  logout() { 
    this.usuariosService.logout();
  }

}
