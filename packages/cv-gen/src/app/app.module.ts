import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ButtonModule } from 'primeng/button';
import { LibCvaModule } from '@cva/my-cva-lib';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    LibCvaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
