import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @Output() cambiarValor = new EventEmitter<number>();
  @Input() public progress: number = 0;
  @Input() leyenda: string = 'Leyenda por defecto';
  @ViewChild('txtProgress', {static:true}) txtProgress: ElementRef;

  constructor() { }


  ngOnInit() {
  }

  cambiar_valor(value: number) {
    if (this.progress >= 100 && value > 0) {
      return;
    }
    if (this.progress <= 0 && value < 0) {
      return;
    }

    this.cambiarValor.emit(this.progress += value);
  }

  onChange(value: number) {
  
    if (value >= 100) {
      value = 100;
    } else if (value <= 0) {
      value = 0
    }

    this.progress = value;
    this.txtProgress.nativeElement.value = Number(this.progress)
    this.txtProgress.nativeElement.focus();

    this.cambiarValor.emit(this.progress);
  }

}
