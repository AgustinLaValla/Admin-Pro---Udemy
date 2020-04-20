import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  public usuario: Usuario;

  constructor(public usuariosService:UsuariosService,
              private router:Router) {
    this.usuario = this.usuariosService.usuario;
   }

  ngOnInit() { };

  buscar(termino:string) { 
    this.router.navigate(['/busqueda', termino]);
  };

  logout() { 
    this.usuariosService.logout();
  };

};
