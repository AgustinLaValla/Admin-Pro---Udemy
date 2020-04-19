import { Component, OnInit, OnDestroy } from '@angular/core';
import { MedicosService } from 'src/app/services/medicos.service';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/interfaces/hospital.interface';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { Medico } from 'src/app/interfaces/medicos.interfaces';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit, OnDestroy {

  public hospitales:Hospital[];
  public medico = new Medico('', '', '', '', '');

  public hospital: Hospital = new Hospital('');

  private paginate:number = 0;

  private notificationSubs$ = new Subscription();

  constructor(private medicosService: MedicosService, 
              private hospitalesService:HospitalesService,
              private router:Router,
              private activatedRoute: ActivatedRoute,
              private modalUploadService: ModalUploadService) {
                this.activatedRoute.params.subscribe((params) => {
                  if(params.id != 'nuevo') { 
                    this.cargarMedico(params.id);
                  };
                });

                this.notificationSubs$ = this.modalUploadService.notification.subscribe((resp) => {
                  this.cargarMedico(this.medico._id);
                });

               };

  ngOnInit() {
    this.hospitalesService.getHospitalesCounter().subscribe(paginate => this.getHospitales(paginate));
  }

  cargarMedico(id:string) { 
    this.medicosService.getMedico(id).subscribe((medico:Medico) => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.getHospital(this.medico.hospital);
    });
  }

  getHospitales(paginate:number) { 
    const desde = 0;
    this.hospitalesService.getHospitales(desde, paginate).subscribe((hospitales) => this.hospitales = hospitales);
  }

  getTotalHospitales() { 
    
  }

  guardarMedico(f:NgForm) {
    if(!f.valid) return; 
    this.medicosService.guardarMedico(this.medico).subscribe((medico:Medico) => {
      Swal.fire('Médico agregado', this.medico.nombre, 'success');
      const id = medico._id;
      this.router.navigate(['/medico', id]);
    },error => Swal.fire('Error', error.statusText, 'error'));
   }

   getHospital(id:string) { 
     console.log(id)
     this.hospitalesService.getHospital(id).subscribe((hospital:Hospital) => {
       this.hospital = hospital;
     });
   };

   changePicture() { 
     this.modalUploadService.mostrarModal('medicos', this.medico._id);
   }

   ngOnDestroy() { 
     this.notificationSubs$.unsubscribe();
   }

}
