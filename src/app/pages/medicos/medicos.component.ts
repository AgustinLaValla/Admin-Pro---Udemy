import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/interfaces/medicos.interfaces';
import { MedicosService } from 'src/app/services/medicos.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  public loading: boolean = false;
  public medicos: Medico[];

  public desde:number = 0;

  private totalMedicos:number = 0;

  constructor(public medicosService: MedicosService,
              private router:Router) { }

  ngOnInit() {
    this.getMedicos();
  };

  getMedicos() { 
    this.medicosService.getMedicos(this.desde).subscribe((medicos:Medico[]) =>{ 
      this.medicos = medicos;
      this.totalMedicos = this.medicosService.totalMedicos;
    });
  };

  buscarMedico(value: string) { 

    if(value.length === 0) { 
      this.getMedicos();
    };
    this.medicosService.searchMedicos(value).subscribe((medicos) => this.medicos = medicos)
  };


  deleteMedico(id:string) { 
    Swal.fire({
      title: 'Estas seguro?',
      text: "Los datos eliminados no se recuperan",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero borrarlo!'
    }).then((result) => {
      if (result.value) {
        this.medicosService.deleteMedico(id).subscribe(() => {
          this.getMedicos()
          Swal.fire(
            'Borrado!',
            'Médico Correctamente eliminado',
            'success'
          );
        }, error => Swal.fire(
          'Error!',
          'Hubo un error: ' + error.statusText,
          'error'
        ));
      };
    });
  };

  incrementarDesde(valor:number) {
    this.desde += valor;
    if(this.desde < 0) this.desde = 0;
    if(this.desde > this.totalMedicos) this.desde = this.totalMedicos;
    if(this.desde % 5 != 1)  this.desde + (Math.round(this.desde % 5));
    if(this.desde ===  this.totalMedicos) return;
    this.getMedicos();
  };

  guardarMedico() { }

}
