import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public sidebar: SidebarService, private usuariosService: UsuariosService) { }

  ngOnInit() { }

  logout() { 
    this.usuariosService.logout();
  }

}
