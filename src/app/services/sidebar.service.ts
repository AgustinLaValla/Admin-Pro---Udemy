import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[] = [];

  constructor() { 
    this.setMenu();
  };

  setMenu() { 
    this.menu = JSON.parse(localStorage.getItem('menu'));
  }

};
