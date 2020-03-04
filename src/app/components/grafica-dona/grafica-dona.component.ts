import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: []
})
export class GraficaDonaComponent implements OnInit {

  @Input() public doughnutChartLabels:Label[] ;
  @Input() public doughnutChartData:MultiDataSet;  
  @Input() public doughnutChartType: ChartType  ;
  @Input() public leyenda:string;

  constructor() { }

  ngOnInit() {
  }

}
