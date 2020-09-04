import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/Clases/categoria';

@Component({
  selector: 'app-index-categorias',
  template:  `<div class="container"> 
                <div class="col">
                  Nombre de categoría:
                </div> 
                <div class="col">
                  <app-form-categorias [iCategoria]="categoria"></app-form-categorias>
                </div>
                <div class="col">
                  <app-lista (categoria)="enviaCategoria($event)" [entrada]="'Categorias'"></app-lista>
                </div>
              </div>`,
  styles: []
})
export class IndexCategoriasComponent implements OnInit {

  public categoria : Categoria;
  constructor() { } 

  ngOnInit(): void {
  }

  public enviaCategoria(categoria : Categoria){
    this.categoria = categoria;
  }

}
