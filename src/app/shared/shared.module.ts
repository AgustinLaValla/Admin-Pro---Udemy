import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BradcrumbsComponent } from './bradcrumbs/bradcrumbs.component';
import { NonpagefoundComponent } from './nonpagefound/nonpagefound.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipesModule } from '../pipes/pipes.module';

const sharedDeclarations = [
    HeaderComponent,
    SidebarComponent,
    BradcrumbsComponent,
    NonpagefoundComponent,
    IncrementadorComponent,
    
]

@NgModule({
    declarations: [sharedDeclarations],
    imports: [CommonModule, FormsModule, RouterModule, PipesModule],
    exports: [sharedDeclarations],
})
export class SharedModule { }
