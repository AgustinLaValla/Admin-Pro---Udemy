import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuariosService } from '../services/usuarios.service';
import Swal from 'sweetalert2';
import { Usuario } from '../interfaces/usuario.interface';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  public forma: FormGroup;
  public isAgree: boolean = false;

  constructor(private usuariosServie: UsuariosService, private router: Router) { }

  areEquals(field1: string, field2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;
      if (pass1 == pass2) {
        return null;
      };

      return {
        equals: false
      };
    };
  };

  ngOnInit() {
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.areEquals('password', 'password2') }); //Global Validator  

    this.forma.setValue({
      nombre: 'Test',
      email: 'test@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: false
    });

  };


  singUp() {
    if (!this.forma.valid) {
      return;
    };
    if (!this.forma.value.condiciones) {
      Swal.fire('Importante!', 'Debe estar de acuerdo con las condiciones', 'warning');
      return
    };

    //create Usuario
    const { nombre, email, password } = this.forma.value;
    const newUsuario = new Usuario(nombre, email, password);

    this.usuariosServie.createUsuario(newUsuario).subscribe((newUser) => this.router.navigate(['/login']));

  };

};
