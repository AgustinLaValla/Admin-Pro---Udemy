import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalesService } from 'src/app/services/hospitales.service';
import { Hospital } from 'src/app/interfaces/hospital.interface';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit, OnDestroy {

  private desde: number = 0;
  private paginate: number = 5;
  public totalHospitals: number = 0;

  public hospitales: Hospital[];
  public loading: boolean;

  private modalNotificatorSubs$ = new Subscription();

  constructor(private hospitalesService: HospitalesService,
    public modalUploadServer: ModalUploadService) {
      this.modalNotificatorSubs$ = this.modalUploadServer.notification.subscribe(() => {
        this.getHospitales();
      });
     };

  ngOnInit() {
    this.getHospitales();
  };

  getHospitales() {
    this.hospitalesService.getHospitales(this.desde, this.paginate).subscribe((hospitales) => {
      this.hospitales = hospitales
      this.totalHospitals = this.hospitalesService.totalHospitales;
    });
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.getHospitales();
    };
    this.hospitalesService.searchHospital(termino).subscribe((hospitales) => this.hospitales = hospitales);
  }

  mostrarModal(id: string) {
    this.modalUploadServer.mostrarModal('hospitales', id);
  }

  guardarHospital(hospital: Hospital) {
    this.hospitalesService.updateHospital(hospital._id, hospital).subscribe(() => this.getHospitales());
  }

  deleteHospital(id: string) {
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
        this.hospitalesService.deleteHospital(id).subscribe(() => {
          this.getHospitales()
          Swal.fire(
            'Borrado!',
            'Hospital Correctamente eliminado',
            'success'
          );
        }, error => Swal.fire(
          'Error!',
          'Hubo un error: ' + error.statusText,
          'error'
        ));
      };
    });
  }

  incrementarDesde(valor: number) {
    this.desde += valor;
    if (this.desde >= this.totalHospitals) return;
    if (this.desde < 0) return;
    this.getHospitales();
  }

  openDialog() {
    Swal.fire({
      title: 'Ingrese el nombre',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Agregar hospital',
      showLoaderOnConfirm: true,
      preConfirm: (value) => {
        if(!value || value.length === 0) return;
        const newHospital = { nombre: value };
        this.hospitalesService.createHospital(newHospital).subscribe(() => {
          this.getHospitales();
          Swal.fire({
            title: `Hospital creado satisfactoriamente`,
          })
        }, error => Swal.fire('Error', 'Se ha producido un error al crear hospital:' + error.message, 'error'));
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }

  ngOnDestroy() { 
    this.modalNotificatorSubs$.unsubscribe();
  };

};
