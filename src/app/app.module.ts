import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { ListComponent } from './page/list/list.component';
import { FormComponent } from './page/form/form.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

/**
 * Constante para armazenar os modulos do Angular Material, facilita na visualização dos que já são utilizados.
 */
const angularMaterial = [
  MatTableModule,
  MatPaginatorModule,
  MatIconModule,
  MatSortModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
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
    FormComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    ...angularMaterial,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "pt-BR" }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
