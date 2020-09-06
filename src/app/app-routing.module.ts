import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { IndexProductosComponent } from './Mantenedores/Productos/index-productos/index-productos.component'; 
import { IndexCategoriasComponent } from './Mantenedores/Categorias/index-categorias/index-categorias.component';
import { WelcomeComponent } from './Home/welcome/welcome.component';

const routes: Routes = [
  { path: 'productos', component: IndexProductosComponent },  
  { path: 'categorias', component: IndexCategoriasComponent },   
  { path: 'index', component: WelcomeComponent },
  { path: "", redirectTo: "/", pathMatch: "full" },// Cuando es la raíz
  { path: "**", redirectTo: "/" }
  //{ path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
