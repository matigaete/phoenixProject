import { BusinessService } from './Servicios/business.service';
import { ProductosService } from './Servicios/productos.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

import { AppComponent } from './app.component';
import { FooterComponent } from './include/footer/footer.component';
import { HeaderComponent } from './include/header/header.component';
import { IndexComponent } from './Home/index/index.component';
import { CreateComponent } from './Mantenedores/Productos/create/create.component';
import { SearchComponent } from './Mantenedores/Productos/search/search.component';
import { IndexProductosComponent } from './Mantenedores/Productos/index-productos/index-productos.component';
import { ListaComponent } from './Include/lista/lista.component';
import { FindComponent } from './Include/find/find.component';
import { InfoComponent } from './Include/info/info.component';
import { ListadoComponent } from './Include/listado/listado.component';
import { DialogoConfirmacionComponent } from './Include/dialogo-confirmacion/dialogo-confirmacion.component';
import { FormCategoriasComponent } from './Mantenedores/Categorias/form-categorias/form-categorias.component';
import { IndexCategoriasComponent } from './Mantenedores/Categorias/index-categorias/index-categorias.component';
import { DialogoColumnaComponent } from './Include/dialogo-columna/dialogo-columna.component';
import { WelcomeComponent } from './Home/welcome/welcome.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CategoriasService } from './Servicios/categorias.service';
import { ProveedoresComponent } from './Mantenedores/proveedores/proveedores.component';
import { ClientesComponent } from './Mantenedores/clientes/clientes.component';
=======
import { DialogoErroresComponent } from './Include/dialogo-errores/dialogo-errores.component';
>>>>>>> Stashed changes

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    IndexComponent,
    CreateComponent,
    SearchComponent,
    IndexProductosComponent,
    ListaComponent,
    FindComponent,
    InfoComponent,
    ListadoComponent,
    WelcomeComponent,
    FormCategoriasComponent,
    IndexCategoriasComponent,
    DialogoColumnaComponent,
    DialogoConfirmacionComponent,
<<<<<<< Updated upstream
    ProveedoresComponent,
    ClientesComponent,
=======
    DialogoErroresComponent,
>>>>>>> Stashed changes
  ],
  entryComponents: [
    DialogoConfirmacionComponent,
    DialogoColumnaComponent,
  ],
  imports: [
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
  providers: [BusinessService, ProductosService, CategoriasService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
