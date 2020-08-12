import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './Mantenedores/Productos/create/create.component'; 
import { IndexProductosComponent } from './Mantenedores/Productos/index-productos/index-productos.component'; 

const routes: Routes = [
  { path: 'index-productos', component: IndexProductosComponent },    
  { path: 'create', component: CreateComponent },    
  //{ path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },   
  //{ path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
