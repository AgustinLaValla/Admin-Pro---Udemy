import { Injectable } from '@angular/core';
import { Ajustes } from '../interfaces/ajustes';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public ajustes:Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark.css'
  };

  constructor() { }

  public guardarAjustes() { 
    localStorage.setItem('ajustes',JSON.stringify(this.ajustes));
  };

  public cargarAjustes() { 
    if(localStorage.getItem('ajustes')) { 
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.apicarTema(this.ajustes.tema);
    }else { 
      this.guardarAjustes(); 
      this.apicarTema(this.ajustes.tema);
    };
  }

  public apicarTema(tema:string) { 
    const url = `assets/css/colors/${tema}.css`;
    document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;
    this.guardarAjustes();
  }

}

