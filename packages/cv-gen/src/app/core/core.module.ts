import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CorePageComponent } from './pages/core/core.page.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    CorePageComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, CoreRoutingModule],
})
export class CoreModule {}
