import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { ListComponent } from './page/list/list.component';
import { FormComponent } from './page/form/form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { registerLocaleData } from '@angular/common';

/**
 * Constante para armazenar os modulos do Angular Material, facilita na visualização dos que já são utilizados.
 */
const angularMaterial = [
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatSortModule
];

const maskConfig: Partial<IConfig> = {
  validation: false,
};

// Registrar pt-BR
registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(maskConfig),
    ...angularMaterial,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
