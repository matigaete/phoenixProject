import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FindComponent } from 'src/app/Include/find/find.component';
import { Ilista } from 'src/app/Interfaces/ilista';
import { Producto } from 'src/app/Clases/producto';

@Component({
  selector: 'app-search',
  template:  `<div class="Container">
                <div class="row">
                    <div class="col">
                        <app-find (filtro)="refresh($event)"></app-find>
                        <app-lista (producto)="enviaProducto($event)" [filtro]=filtro></app-lista>
                    </div>
                    <div class="col">
                        <app-create *ngIf="valor == 2"  [producto]=producto></app-create>
                        <app-info   *ngIf="valor == 3"  [producto]=producto></app-info>
                    </div>
                </div>
              </div>`,
  styles: []
})
export class SearchComponent implements OnInit {

  @Input() valor : number;
  public filtro : string; 
  public producto : Producto;

  constructor() { }

  ngOnInit(): void {
  }
  
  refresh(filtro : string){
    this.filtro = filtro;
  }

  enviaProducto(producto : Producto){
    this.producto = producto;
  }
}
