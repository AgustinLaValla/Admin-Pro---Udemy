import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interface';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

export class UsuariosService {

    public usuario: Usuario;
    public token: string;

    constructor(private http: HttpClient, private router: Router) {
        this.loadStorage();
    }

    isLogged() {
        return (!isNullOrUndefined(this.token) && this.token.length > 5) ? true : false;
    }

    loadStorage() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
        };
    };

    guardarStorage(id: string, token: string, usuario: Usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        this.usuario = usuario;
        this.token = token;
    };

    createUsuario(usuario: Usuario) {
        let url = URL_SERVICIOS;
        return this.http.post(`${url}/usuario`, usuario).pipe(map((resp) => {
            Swal.fire('Usuario creado!', `Ahora puede ingresar con la cuneta creada: ${usuario.email}`, 'success');
            return resp['usuario'];
        }));
    };

    loginWhitUserAndPassword(usuario: Usuario, recuerdame: boolean) {

        if (recuerdame) {
            localStorage.setItem('email', usuario.email);
        } else {
            localStorage.removeItem('email');
        };

        let url = `${URL_SERVICIOS}/login`;
        return this.http.post(url, usuario).pipe(map((resp) => {
            this.guardarStorage(resp['id'], resp['token'], resp['usuario']);
            return true;
        }));
    };

    loginWihtGoogle(token: string) {
        let url = `${URL_SERVICIOS}/login/google`;
        return this.http.post(url, { token }).pipe(map((resp) => {
            this.guardarStorage(resp['usuario']._id, resp['token'], resp['usuario']);
            return true;
        }));
    };

    updateUsuario(usuario: Usuario) {
        const { _id } = usuario;
        const url = `${URL_SERVICIOS}/usuario/${_id}`;
        const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'token': this.token });
        return this.http.put(url, usuario, { headers: httpHeaders }).pipe(map((resp) => {
            if (usuario._id === this.usuario._id) {
                const usuarioDB = resp['usuario'];
                this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
            };
            Swal.fire('Operación exitosa', 'El usuario se actualizado correctamente', 'success');
            return true;
        }));
    }

    logout() {
        this.usuario = null;
        this.token = null;
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('usuario');
        this.router.navigate(['/login']);
    }

    getUsers(desde: number = 0, paginate: number = 5) {
        return this.http.get(`${URL_SERVICIOS}/usuario?desde=${desde}&paginate=${paginate}`);
    }

    buscarUsuario(termino: string) {
        return this.http.get(`${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`)
            .pipe(map((resp) => resp['usuarios']));
    };

    deleteUsuario(id: string) {
        const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'token': this.token });
        return this.http.delete(`${URL_SERVICIOS}/usuario/${id}`, { headers: httpHeaders });
    };


    updateProfilePicture(url:string, form: FormData, id:string) {

        return this.http.put(url, form).pipe(map((resp) => {
            console.log(this.usuario._id, id)
            if(this.usuario._id === id) { 
                const usuario = resp['usuario'];
                this.guardarStorage(usuario._id, this.token, usuario);
            }
            Swal.fire('Operación exitosa', 'La imagen se acutalizó correctamente', 'success');
        }));

    }

};