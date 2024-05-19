import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './componentes/nav/nav.component';
import { TableComponent } from './componentes/table/table.component';
import { HttpClientModule} from "@angular/common/http";
import { FormularioRegistroComponent } from './componentes/formulario-registro/formulario-registro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Productos } from './models/productos';
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TableComponent,
    FormularioRegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    Productos
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
