import { BusinessService } from './Servicios/business.service';
import { ProductosService } from './Servicios/productos.service';
import { ServiciosService } from './Servicios/servicios.service';
import { PersonaService } from './Servicios/persona.service';
import { FacturaService } from './Servicios/factura.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

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

import { AppComponent } from './app.component';
import { FooterComponent } from './include/footer/footer.component';
import { HeaderComponent } from './include/header/header.component';
import { IndexComponent } from './Home/index/index.component'; 
import { FindComponent } from './Include/find/find.component'; 
import { ListadoComponent } from './Include/listado/listado.component';
import { DialogoConfirmacionComponent } from './Include/dialogo-confirmacion/dialogo-confirmacion.component';
import { FormCategoriasComponent } from './Mantenedores/Categorias/form-categorias/form-categorias.component';
import { IndexCategoriasComponent } from './Mantenedores/Categorias/index-categorias/index-categorias.component';
import { DialogoColumnaComponent } from './Include/dialogo-columna/dialogo-columna.component';
import { WelcomeComponent } from './Home/welcome/welcome.component';
import { CategoriasService } from './Servicios/categorias.service';
import { ProveedoresComponent } from './Mantenedores/proveedores/proveedores.component';
import { ClientesComponent } from './Mantenedores/clientes/clientes.component';
import { DialogoErroresComponent } from './Include/dialogo-errores/dialogo-errores.component';
import { IndexProductosComponent } from './Mantenedores/Productos/index-productos/index-productos.component';
import { IndexServiciosComponent } from './Mantenedores/Servicios/index-servicios/index-servicios.component';
import { CreateServiceComponent } from './Mantenedores/Servicios/create-service/create-service.component';
import { SearchServiceComponent } from './Mantenedores/Servicios/search-service/search-service.component';
import { CreateProductComponent } from './Mantenedores/Productos/create-product/create-product.component';
import { SearchProductComponent } from './Mantenedores/Productos/search-product/search-product.component';
import { InfoProductosComponent } from './Include/info-productos/info-productos.component';
import { InfoServiciosComponent } from './Include/info-servicios/info-servicios.component';
import { ListaProductosComponent } from './Include/lista-productos/lista-productos.component';
import { ListaCategoriasComponent } from './Include/lista-categorias/lista-categorias.component';
import { ListaServiciosComponent } from './Include/lista-servicios/lista-servicios.component'; 


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
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
    ProveedoresComponent,
    ClientesComponent,
    DialogoErroresComponent,
    IndexServiciosComponent,
    CreateServiceComponent,
    SearchServiceComponent,
    CreateProductComponent,
    SearchProductComponent,
    InfoProductosComponent,
    InfoServiciosComponent,
    ListaProductosComponent,
    ListaCategoriasComponent,
    ListaServiciosComponent, 
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
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    BrowserAnimationsModule,
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
    MatCardModule
  ],
  providers: [BusinessService, ProductosService, CategoriasService, FacturaService, ServiciosService, PersonaService ,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
