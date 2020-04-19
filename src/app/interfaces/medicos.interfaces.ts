import { Usuario } from './usuario.interface';
import { Hospital } from './hospital.interface';

export class Medico { 
    constructor(
        public nombre:string,
        public _id?:string,
        public img?: string,
        public usuario?:Partial<Usuario> | string, 
        public hospital?: Partial<Hospital> | any
    ) { }
};