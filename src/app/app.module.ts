import { BusinessService } from './Servicios/business.service';
import { ProductosService } from './Servicios/productos.service';
import { ServiciosService } from './Servicios/servicios.service';
import { PersonaService } from './Servicios/persona.service';
import { FacturaService } from './Servicios/factura.service';
import { CategoriasService } from './Servicios/categorias.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { FooterComponent } from './include/footer/footer.component';
import { IndexComponent } from './Home/index/index.component';
import { FindComponent } from './Include/find/find.component';
import { ListadoComponent } from './Include/listado/listado.component';
import { FormCategoriasComponent } from './Mantenedores/Categorias/form-categorias/form-categorias.component';
import { WelcomeComponent } from './Home/welcome/welcome.component';
import { IndexCategoriasComponent } from './Mantenedores/Categorias/index-categorias/index-categorias.component';
import { IndexProductosComponent } from './Mantenedores/Productos/index-productos/index-productos.component';
import { IndexPersonComponent } from './Mantenedores/Personas/index-person/index-person.component';
import { CreateServiceComponent } from './Mantenedores/Servicios/create-service/create-service.component';
import { CreateProductComponent } from './Mantenedores/Productos/create-product/create-product.component';
import { IndexServiceComponent } from './Mantenedores/Servicios/index-service/index-service.component';
import { SearchProductComponent } from './Mantenedores/Productos/search-product/search-product.component';
import { InfoProductosComponent } from './Include/info-productos/info-productos.component';
import { InfoServiciosComponent } from './Include/info-servicios/info-servicios.component';
import { ListaProductosComponent } from './Include/lista-productos/lista-productos.component';
import { ListaCategoriasComponent } from './Include/lista-categorias/lista-categorias.component';
import { ListaServiciosComponent } from './Include/lista-servicios/lista-servicios.component';

import { DialogoColumnaComponent } from './Include/dialogo-columna/dialogo-columna.component';
import { DialogoConfirmacionComponent } from './Include/dialogo-confirmacion/dialogo-confirmacion.component';
import { DialogoErroresComponent } from './Include/dialogo-errores/dialogo-errores.component';
import { CreatePersonComponent } from './Mantenedores/Personas/create-person/create-person.component';
import { InfoPersonasComponent } from './Include/info-personas/info-personas.component';
import { ListaPersonasComponent } from './include/lista-personas/lista-personas.component';
import { RutPipe } from './Pipes/rut.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    IndexComponent,
    CreateProductComponent,
    SearchProductComponent,
    IndexProductosComponent,
    FindComponent,
    ListadoComponent,
    WelcomeComponent,
    FormCategoriasComponent,
    IndexCategoriasComponent,
    DialogoColumnaComponent,
    DialogoConfirmacionComponent,
    DialogoErroresComponent,
    CreateServiceComponent,
    IndexServiceComponent,
    CreateProductComponent,
    SearchProductComponent,
    InfoProductosComponent,
    InfoServiciosComponent,
    ListaProductosComponent,
    ListaCategoriasComponent,
    ListaServiciosComponent,
    IndexPersonComponent, 
    CreatePersonComponent, 
    InfoPersonasComponent, 
    ListaPersonasComponent,
    RutPipe,
  ],
  entryComponents: [
    DialogoConfirmacionComponent,
    DialogoColumnaComponent,
    DialogoErroresComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatCardModule,
    MatAutocompleteModule,
    MatPaginatorModule
  ],
  providers: [BusinessService, ProductosService, CategoriasService,
    FacturaService, ServiciosService, PersonaService, DatePipe, RutPipe, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
