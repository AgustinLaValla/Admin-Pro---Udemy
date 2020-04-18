import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public usuarios: Usuario[];
  public desde: number = 0;
  public paginate: number = 5;
  public totalUsuarios: number;
  public loading: boolean = false;

  modalNotificatorSubs$ = new Subscription();

  constructor(public usuariosService: UsuariosService,
              public modalUploadServer:ModalUploadService) {
                this.modalNotificatorSubs$ = this.modalUploadServer.notification.subscribe(resp => this.getUsers(this.desde));
  };

  ngOnInit() {
    this.loading = true;
    this.getUsers();
  }

  mostrarModal(id:string) {
    this.modalUploadServer.mostrarModal('usuarios', id);
  }

  getUsers(desde?: number, hasta?: number) {
    this.usuariosService.getUsers(this.desde, this.paginate).subscribe(resp => {
      this.usuarios = resp['usuarios'];
      this.totalUsuarios = resp['total'];
      this.loading = false;
    });
  };


  incrementarDesde(valor: number) {
    this.desde += valor;
    if (this.desde >= this.totalUsuarios) return;
    if (this.desde < 0) return;
    this.getUsers();

  };

  buscarUsuario(termino: string) {
    if (termino.length <= 0) {
      this.getUsers();
    }
    this.usuariosService.buscarUsuario(termino).subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    });
  };

  deleteUsuario(id: string) {
    if (id === this.usuariosService.usuario._id) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a sí mismo', 'error');
      return;
    };
    Swal.fire({
      title: 'Estas seguro?',
      text: "Los datos eliminados no se recuperan",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero borrarlo!'
    }).then((result) => {
      if (result.value) {
        this.usuariosService.deleteUsuario(id).subscribe(() => {
          this.desde = (this.desde > 0) ? this.desde - 1 : this.desde;
          this.totalUsuarios -= 1;
          this.getUsers(this.desde);
          Swal.fire(
            'Borrado!',
            'Usuario Correctamente eliminado',
            'success'
          );
        }, error => Swal.fire(
          'Error!',
          'Hubo un error: ' + error.statusText,
          'error'
        ));
      };
    });

  };

  guardarUsuario(usuario:Usuario){ 
    this.usuariosService.updateUsuario(usuario).subscribe(console.log);
  }

  ngOnDestroy() { 
    this.modalNotificatorSubs$.unsubscribe();
  }

}
