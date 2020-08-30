import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './include/footer/footer.component';
import { HeaderComponent } from './include/header/header.component';
import { IndexComponent } from './Home/index/index.component';
import { CreateComponent } from './Mantenedores/Productos/create/create.component';
import { SearchComponent } from './Mantenedores/Productos/search/search.component'; 
import { IndexProductosComponent } from './Mantenedores/Productos/index-productos/index-productos.component';
import { BusinessService } from './business.service';
import { ListaComponent } from './Include/lista/lista.component';
import { FindComponent } from './Include/find/find.component';
import { InfoComponent } from './Include/info/info.component';
import { ListadoComponent } from './Include/listado/listado.component';
  
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
    ListadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BusinessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
