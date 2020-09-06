import { BusinessService } from './Servicios/business.service';
import { ProductosService } from './Servicios/productos.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
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
    DialogoConfirmacionComponent,  
    FormCategoriasComponent, 
    IndexCategoriasComponent, DialogoColumnaComponent, WelcomeComponent,
  ],
  entryComponents: [
    DialogoConfirmacionComponent,
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
    MatExpansionModule
  ],
  providers: [BusinessService, ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
