import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { UsuariosService } from './usuarios.service';
import { HospitalesService } from './hospitales.service';
import { MedicosService } from './medicos.service';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(private http:HttpClient,
              private usuariosService: UsuariosService,
              private hospitalesService: HospitalesService,
              private medicosService: MedicosService
              ) { }

  subirArchivo(archivo:File, tipo:string, id:string) {
    const url = `${URL_SERVICIOS}/upload/${tipo}/${id}`; 
    let form = new FormData();
    form.append('imagen', archivo, archivo.name);

    if(tipo === 'usuarios') { 
      return this.usuariosService.updateProfilePicture(url, form, id);
    };
    if(tipo === 'hospitales') { 
      return this.hospitalesService.updateHospitalPicture(url, form);
    };
    if(tipo === 'medicos')  {
      return this.medicosService.updateMedicoPicture(url, form);
    };
    return;
  };
}
