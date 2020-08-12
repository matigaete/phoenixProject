import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './include/footer/footer.component';
import { HeaderComponent } from './include/header/header.component';
import { IndexComponent } from './Home/index/index.component';
import { CreateComponent } from './Mantenedores/Productos/create/create.component';
import { SearchComponent } from './Mantenedores/Productos/search/search.component';
import { ModifyComponent } from './Mantenedores/Productos/modify/modify.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    IndexComponent,
    CreateComponent,
    SearchComponent,
    ModifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
