import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateComponent } from './Mantenedores/Productos/create/create.component'; 

const routes: Routes = [
  { path: 'create', component: CreateComponent },    
  //{ path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },   
  //{ path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
