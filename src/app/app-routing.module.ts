import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NonpagefoundComponent } from './shared/nonpagefound/nonpagefound.component';
import { RegisterComponent } from './login/register.component';



const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'**',  component:NonpagefoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
