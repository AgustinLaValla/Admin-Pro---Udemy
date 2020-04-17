import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import { UsuariosService } from './usuarios.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(private http:HttpClient, private usuariosService: UsuariosService) { }

  subirArchivo(archivo:File, tipo:string, id:string) {
    const url = `${URL_SERVICIOS}/upload/${tipo}/${id}`; 
    let form = new FormData();
    form.append('imagen', archivo, archivo.name);
    return this.http.put(url, form).pipe(map((resp)=> {
      const usuario = resp['usuario'];
      this.usuariosService.guardarStorage(usuario._id, this.usuariosService.token, usuario);
      Swal.fire('Operación exitosa', 'La imagen se acutalizó correctamente', 'success');
    }));
  };
}
