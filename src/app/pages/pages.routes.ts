import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuard } from '../guards/login.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';
import { VerificaTokenGuard } from '../guards/verifica-token.guard';



const routes: Routes = [
    { 
        path:'', 
        component: PagesComponent, 
        canActivate:[LoginGuard],
        children:[
            { path: 'dashboard', component:DashboardComponent, data: {titulo: 'Dashboard' }, canActivate:[VerificaTokenGuard] },
            { path:'progress', component: ProgressComponent, data: {titulo: 'Progress' , canActivate:[VerificaTokenGuard]} },
            { path:'graficas1', component: Graficas1Component, data: {titulo: 'Gráficas' }, canActivate:[VerificaTokenGuard] },
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas' }, canActivate:[VerificaTokenGuard] },
            { path:'account-settings', component: AccountSettingsComponent, data: {titulo: 'Settings' }, canActivate:[VerificaTokenGuard] },
            { path: 'rxjs' , component: RxjsComponent, data: {titulo: 'Observables' }, canActivate:[VerificaTokenGuard]},
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' }, canActivate:[VerificaTokenGuard] },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador' }, canActivate:[VerificaTokenGuard] },
            //Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Mantenimiento de usuarios' }, canActivate:[AdminGuard, VerificaTokenGuard] },
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales' }, canActivate:[VerificaTokenGuard] },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de Médicos' }, canActivate:[VerificaTokenGuard] },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Acutualizar médico' }, canActivate:[VerificaTokenGuard] },
            { path:'', redirectTo: 'dashboard', pathMatch: 'full' }
          ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
