import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FindComponent } from 'src/app/Include/find/find.component';
import { Ilista } from 'src/app/Interfaces/ilista';
import { Producto } from 'src/app/Clases/producto';

@Component({
  selector: 'app-search',
  template:  `<div class="Container">
                <div class="row">
                    <div class="col">
                        <app-find (filtro)="refresh($event)"></app-find>
                        <app-lista (producto)="enviaProducto($event)" [filtro]=filtro [entrada]="'Productos'"></app-lista>
                    </div>
                    <div class="col">
                        <app-create *ngIf="iValor == 2"  [iProducto]="producto"></app-create>
                        <app-info   *ngIf="iValor == 3"  [iProducto]="producto" (oValor)="enviaAccion($event)"></app-info>
                    </div>
                </div>
              </div>`,
  styles: []
})
export class SearchComponent implements OnInit {
   
  @Input() iValor : number;
  public filtro : number; 
  public producto : Producto;

  constructor() { }

  public ngOnInit(): void {
  }
  
  public refresh(filtro : number){
    this.filtro = filtro;
  }

  public enviaProducto(producto : Producto){
    this.producto = producto;
  }

  public enviaAccion(oValor: number){
    this.iValor = oValor; 
  }

}
