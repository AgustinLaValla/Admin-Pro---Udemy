import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routes';
import { RouterModule } from '@angular/router';


const componentDeclarations = [
    DashboardComponent, 
    Graficas1Component,
    ProgressComponent,
    PagesComponent
]

@NgModule({
    declarations: [componentDeclarations],
    imports: [SharedModule,PagesRoutingModule, RouterModule],
    exports: [componentDeclarations, SharedModule],
})
export class PagesModule { }
