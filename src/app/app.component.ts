import { Component } from '@angular/core';
import { SettingsService } from './services/settings.service';
import { Ajustes } from './interfaces/ajustes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private settings:SettingsService) { 
    this.settings.cargarAjustes();
  }

  title = 'adminpro';
}
