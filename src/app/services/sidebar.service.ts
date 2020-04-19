import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url:'/dashboard'},
        {titulo: 'Progress Bar', url: '/progress'},
        {titulo: 'Gráficas', url: '/graficas1'},
        {titulo: 'Promesas', url:'/promesas'},
        {titulo: 'Observables', url:'/rxjs'}

      ]
    },
    {
    titulo: 'Mantenimientos',
    icono: 'mdi mdi-folder-lock-open',
    submenu: [
      {titulo: 'Usarios', url:'/usuarios'},
      {titulo: 'Hospitales', url: '/hospitales'},
      {titulo: 'Medicos', url: '/medicos'},

    ]}
  ];

  constructor() { }
}
