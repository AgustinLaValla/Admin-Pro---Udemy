import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario.interface';
import { URL_SERVICIOS } from '../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SidebarService } from './sidebar.service';

@Injectable({ providedIn: 'root' })

export class UsuariosService {

    public usuario: Usuario;
    public token: string;
    public menu: any[] = [];

    public menuNotificator = new Subject<any>();

    constructor(private http: HttpClient, private router: Router, private sidebar:SidebarService) {
        this.loadStorage();
    }

    isLogged() {
        return (!isNullOrUndefined(this.token) && this.token.length > 5) ? true : false;
    }

    loadStorage() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.menu = JSON.parse(localStorage.getItem('menu'));
            this.sidebar.setMenu();
            console.log('LOAD STORAGE' ,this.menu);
        } else { 
            this.token = '';
            this.usuario = null;
            this.menu = [];
        };
    };

    guardarStorage(id: string, token: string, usuario: Usuario, menu:any) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('menu', JSON.stringify(menu));
        this.usuario = usuario;
        this.token = token;
        this.menu = menu;
        this.sidebar.setMenu();
    };

    createUsuario(usuario: Usuario) {
        let url = URL_SERVICIOS;
        return this.http.post(`${url}/usuario`, usuario).pipe(map((resp) => {
            Swal.fire('Usuario creado!', `Ahora puede ingresar con la cuneta creada: ${usuario.email}`, 'success');
            return resp['usuario'];
        }), catchError(error => {
            console.log(error); 
            return Swal.fire('Error al registrarse',   error.error.mensaje.message, 'error')
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
            this.guardarStorage(resp['id'], resp['token'], resp['usuario'], resp['menu']);
            return true;
        }), catchError(error => Swal.fire('Error al ingresar', error.status + ': ' + error.error.message, 'error')));
    };

    loginWihtGoogle(token: string) {
        let url = `${URL_SERVICIOS}/login/google`;
        return this.http.post(url, { token }).pipe(map((resp) => {
            this.guardarStorage(resp['usuario']._id, resp['token'], resp['usuario'], resp['menu']);            
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
                this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
            };
            Swal.fire('Operación exitosa', 'El usuario se actualizado correctamente', 'success');
            return true;
        }));
    }

    logout() {
        this.usuario = null;
        this.token = null;
        this.menu = [];
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('usuario');
        localStorage.removeItem('totalHospitales');
        localStorage.removeItem('menu');
        this.router.navigate(['/login']);
    }

    getUsers(desde: number = 0, paginate: number = 5) {
        const url = `${URL_SERVICIOS}/usuario?desde=${desde}&paginate=${paginate}`;
        const headers = new HttpHeaders({'token': this.token});
        return this.http.get(url, {headers});
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
            if(this.usuario._id === id) { 
                const usuario = resp['usuario'];
                this.guardarStorage(usuario._id, this.token, usuario, this.menu);
            }
            Swal.fire('Operación exitosa', 'La imagen se acutalizó correctamente', 'success');
        }));

    }

};