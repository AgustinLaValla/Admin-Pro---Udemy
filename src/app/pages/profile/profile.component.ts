import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/subir-archivo.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;
  private picture:File;
  public photoSelected: string | ArrayBuffer;

  constructor(public usuariosService: UsuariosService, 
              private subirArchivoService: SubirArchivoService) {
    this.usuario = this.usuariosService.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Partial<Usuario>) {
    this.usuario.nombre = usuario.nombre;
    if(!this.usuario.google) {
      this.usuario.email = usuario.email;
    };
    this.usuariosService.updateUsuario(this.usuario).subscribe((usuario) => { }
      , error => Swal.fire('Error al actualizar', 'Vuelva a ingresar con su cuenta e intente nuevamente', 'error'));
  }

  savePicture(event) { 
    if(event.target.files[0].type.indexOf('image') < 0) { 
      Swal.fire('Solo imágenes!', 'El archivo seleccionado no es una imagen', 'error');
      return
    }
    this.picture = event.target.files[0];
     //image preview
     const reader = new FileReader();
     reader.onload = e => this.photoSelected = reader.result;
     reader.readAsDataURL(this.picture);
  };

  uploadProfileImage() { 
    console.log(this.picture);
    if(this.picture) { 
      this.subirArchivoService.subirArchivo(this.picture, 'usuarios', this.usuario._id).subscribe(() => {
        this.photoSelected = null;
        this.picture = null;
      });
    };

  }

}
