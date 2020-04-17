import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): string {
    let url = URL_SERVICIOS + '/img';
    console.log('path: ', `${url}/${tipo}/${img}`)
    if (!img) {
      return url + '/usuarios/xxx'
    };

    if (img.indexOf('https') >= 0) {
      return img;
    };

    if (tipo === 'usuarios' || tipo === 'hospitales' || tipo === 'medicos') {
      return `${url}/${tipo}/${img}`;
    } else {
      console.log('Tipo de imagen no existe. Tipos posible: "medicos", "usarios", "hospitales" ');
      return `${url}/usuarios/xxx`;
    };
  
  };

}
