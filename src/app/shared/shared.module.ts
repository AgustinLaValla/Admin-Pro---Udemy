import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BradcrumbsComponent } from './bradcrumbs/bradcrumbs.component';
import { NonpagefoundComponent } from './nonpagefound/nonpagefound.component';

const sharedDeclarations = [
    HeaderComponent,
    SidebarComponent,
    BradcrumbsComponent,
    NonpagefoundComponent
]

@NgModule({
    imports: [],
    declarations: [sharedDeclarations],
    exports: [sharedDeclarations],
})
export class SharedModule { }
