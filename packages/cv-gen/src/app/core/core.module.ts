import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CorePageComponent } from './pages/core/core.page.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import { MobileSidebarsComponent } from './components/mobile-sidebars/mobile-sidebars.component';
import { LanguageButtonComponent } from '../shared/components/language-button/language-button.component';
import { ThemeButtonComponent } from '../shared/components/theme-button/theme-button.component';
import { HideElementDirective } from '../shared/directives/show-hide-elem.directive';

@NgModule({
  declarations: [
    CorePageComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    MobileSidebarsComponent,
    HeaderComponent,
    HideElementDirective,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    ButtonModule,
    MenuModule,
    AvatarModule,
    LanguageButtonComponent,
    ThemeButtonComponent,
  ],
})
export class CoreModule {}
