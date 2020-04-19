import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import { UsuariosService } from './usuarios.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  public totalHospitales:number = Number(localStorage.getItem('totalHospitales'));

  constructor(private http: HttpClient, private usuarioService: UsuariosService) { }

  getHospitales(desde: number = 0, paginate: number = 5) {
    let url = `${URL_SERVICIOS}/hospitales?desde=${desde}&paginate=${paginate}`;
    return this.http.get(url).pipe(map((resp) => {
      localStorage.setItem('totalHospitales', resp['total'].toString());
      this.totalHospitales = resp['total'];
      return resp['hospitales'];
    }));
  };

  getHospital(id: string) {
    let url = `${URL_SERVICIOS}/hospitales/${id}`;
    return this.http.get(url).pipe(map((resp) => resp['hospital']));
  }

  searchHospital(termino: string) {
    let url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`
    return this.http.get(url).pipe(map((resp) => resp['hospitales']));
  };

  createHospital(body: any) {
    let url = `${URL_SERVICIOS}/hospitales`;
    const token = this.usuarioService.token;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'token': token });
    return this.http.post(url, body, { headers });
  }

  updateHospital(id: string, body: any) {
    let url = `${URL_SERVICIOS}/hospitales/${id}`;
    const token = this.usuarioService.token;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'token': token });
    return this.http.put(url, body, {headers}).pipe(map((resp) => 
      Swal.fire('Hospital actualizado:', resp['hospital'].nombre, 'success')));
  }

  deleteHospital(id: string) {
    let url = `${URL_SERVICIOS}/hospitales/${id}`;
    const token = this.usuarioService.token;
    const headers = new HttpHeaders({ 'token': token });
    return this.http.delete(url, { headers });
  };


  updateHospitalPicture(url: string, form: FormData) {

    return this.http.put(url, form).pipe(map((resp) => {
      Swal.fire('Operación exitosa', 'La imagen se acutalizó correctamente', 'success');
    }));

  };

  getHospitalesCounter() { 
    let url = `${URL_SERVICIOS}/hospitales/collection-data/counter`;
    return this.http.get(url).pipe(map(resp => resp['total']));
  }

};
