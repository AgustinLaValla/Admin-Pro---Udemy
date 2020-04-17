import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routes';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component'

const componentDeclarations = [
    DashboardComponent, 
    Graficas1Component,
    ProgressComponent,
    PagesComponent,
    GraficaDonaComponent
]

@NgModule({
    declarations: [
        componentDeclarations, 
        AccountSettingsComponent, 
        PromesasComponent, 
        RxjsComponent, ProfileComponent],
        
    imports: [
        SharedModule,
        PagesRoutingModule, 
        RouterModule, 
        CommonModule, 
        FormsModule, 
        ChartsModule, 
        PipesModule
    ],
    exports: [componentDeclarations, SharedModule],
})
export class PagesModule { }
