import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BradcrumbsComponent } from './bradcrumbs/bradcrumbs.component';
import { NonpagefoundComponent } from './nonpagefound/nonpagefound.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const sharedDeclarations = [
    HeaderComponent,
    SidebarComponent,
    BradcrumbsComponent,
    NonpagefoundComponent,
    IncrementadorComponent
]

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [sharedDeclarations],
    exports: [sharedDeclarations],
})
export class SharedModule { }
