import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Usuario } from '../interfaces/usuario.interface';
import { UsuariosService } from '../services/usuarios.service';
import Swal from 'sweetalert2';

declare function init_plugins(); //jQuery plugins initialization
declare const gapi: any // Google Api Library (imported at index.html)

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public recuerdame: boolean = false;
  public auth2: any;

  constructor(private router: Router, private usuariosService: UsuariosService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    };
  };

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '337218875190-1fch0gemblkajnmbmtfg89u764mjrleh.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignIn(document.getElementById('btn_google'));
    });
  };

  attachSignIn(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this.usuariosService.loginWihtGoogle(token).subscribe((resp) => window.location.href = '#/dashboard');

    });
  };

  ingresar(usuario: NgForm) {
    const { email, password } = usuario.value;
    const user = new Usuario(null, email, password)

    this.usuariosService.loginWhitUserAndPassword(user, this.recuerdame).subscribe((resp) => {
      this.router.navigate(['/dashboard'])
    });
  };




}
