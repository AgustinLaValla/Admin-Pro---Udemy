import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public picture: File;
  public photoSelected: string | ArrayBuffer;


  constructor(private subirArchivoService: SubirArchivoService,
    public modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  savePicture(event) {
    if (event.target.files[0].type.indexOf('image') < 0) {
      Swal.fire('Solo imágenes!', 'El archivo seleccionado no es una imagen', 'error');
      return
    }
    this.picture = event.target.files[0];
    //image preview
    const reader = new FileReader();
    reader.onload = e => this.photoSelected = reader.result;
    reader.readAsDataURL(this.picture);
  };

  uploadImage() {
    if (!this.picture) {
      this.modalUploadService.ocultarModal();
      this.photoSelected = null;
      return
    };

    this.subirArchivoService.subirArchivo(this.picture, this.modalUploadService.tipo, this.modalUploadService.id)
      .subscribe((resp) => {
        this.modalUploadService.notification.emit(resp);
        this.cerrarModal();
      }, error => Swal.fire('Error', 'Se produjo un error al cargar el archivo', 'error'));
  }

  cerrarModal() {
    this.photoSelected = null;
    this.picture = null;
    this.modalUploadService.ocultarModal();
  }

}
