import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private _document, public settings:SettingsService) { }

  ngOnInit() { 
    this.colocarCheck();
  }

  cambiarColor(tema: string, selector: string) {
    const className = `selector ${selector}`;
    this.aplicarCheck(className);

    this.settings.apicarTema(tema);
  }

  aplicarCheck(className: string) {
    let selectors = document.getElementsByClassName('selector');
    for (let i = 0; i < selectors.length; i++) {
      if (selectors[i].className == className) {
        selectors[i].className = `${className} working`;
      } else {
        if (selectors[i].className.includes('working')) {
          let startAt = selectors[i].className.indexOf('working');
          selectors[i].className = selectors[i].className.slice(0, (startAt - 1));
        };
      };
    };
  }

  colocarCheck() { 
    let selectors = document.getElementsByClassName('selector');
    let tema = this.settings.ajustes.tema;
    for(let i = 0; i < selectors.length; i++) { 
      if( selectors[i].getAttribute('data-theme') == tema ) { 
        selectors[i].classList.add('working');
        break;
      };
    };
  };

}
