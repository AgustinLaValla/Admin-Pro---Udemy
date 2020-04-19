//Angular Modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//Custom Modules
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages.routes';
import { PipesModule } from '../pipes/pipes.module';

//Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { ChartsModule } from 'ng2-charts';
import { GraficaDonaComponent } from '../components/grafica-dona/grafica-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component'
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

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
        RxjsComponent, 
        ProfileComponent, 
        UsuariosComponent,
        ModalUploadComponent,
        HospitalesComponent,
        MedicosComponent,
        MedicoComponent
    ],
        
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
