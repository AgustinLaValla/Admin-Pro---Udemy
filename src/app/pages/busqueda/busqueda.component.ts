import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { Medico } from 'src/app/interfaces/medicos.interfaces';
import { Hospital } from 'src/app/interfaces/hospital.interface';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[] = [];
  public medicos:Medico[] = [];
  public hospitales:Hospital[] = [];

  constructor(private activatedRoute:ActivatedRoute,
              private http: HttpClient) { 
    this.activatedRoute.params.subscribe(params => {
      const termino = params.termino;
      this.buscar(termino);
    });
  }

  ngOnInit() { }

  buscar(termino:string) { 
    const url = `${URL_SERVICIOS}/busqueda/todo/${termino}`;
    this.http.get(url).subscribe(resp => {
      this.usuarios = resp['usuarios'];
      this.medicos = resp['medicos'];
      this.hospitales = resp['hospitales'];
      console.log(resp)
    });
  };

};
