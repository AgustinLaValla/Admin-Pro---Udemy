import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map, catchError } from 'rxjs/operators';
import { UsuariosService } from './usuarios.service';
import { Medico } from '../interfaces/medicos.interfaces';
import Swal from 'sweetalert2';

//HEADERS WITH TOKEN ARE SETTED BY INTERCEPTORS, THAT'S WHY I'VE COMMENTED IT

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  public totalMedicos: number = 0;

  constructor(private http: HttpClient,
              private usuariosService: UsuariosService) { }

  getMedicos(desde:number = 0, paginate:number = 5) {
    const url = `${URL_SERVICIOS}/medicos?desde=${desde}&paginate=${paginate}`;
    return this.http.get(url).pipe(map((resp) => {
      this.totalMedicos = resp['total'];
      return resp['medicos'];
    }));
  };

  getMedico(id:string) { 
    const url = `${URL_SERVICIOS}/medicos/${id}`;
    return this.http.get(url).pipe(map(resp => resp['medico']));
  };

  searchMedicos(termino: string) {
    return this.http.get(`${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`)
      .pipe(map((resp) => resp['medicos']));
  };

  guardarMedico(medico: Medico) {
    // const token = this.usuariosService.token;
    // const headers = new HttpHeaders({'Content-Type' : 'application/json', 'token': token}); 

    if(medico._id) { 
      //Update
      const url = `${URL_SERVICIOS}/medicos/${medico._id}`;
      return this.http.put(url, medico, /*{headers}*/).pipe(map(resp => resp['medico']));
    } else { 
      //create
      const url = `${URL_SERVICIOS}/medicos`;
      return this.http.post(url, medico, /*{headers}*/).pipe(map((resp) => resp['medico']));
    };
  };

  deleteMedico(id:string) { 
    const url = `${URL_SERVICIOS}/medicos/${id}`;
    // const token = this.usuariosService.token;
    // const headers = new HttpHeaders({'token': token});
    return this.http.delete(url, /*{headers}*/);
  };

  updateMedicoPicture(url: string, form: FormData) {

    return this.http.put(url, form).pipe(map((resp) => {
      Swal.fire('Operación exitosa', 'La imagen se acutalizó correctamente', 'success');
    }));

  };

}
