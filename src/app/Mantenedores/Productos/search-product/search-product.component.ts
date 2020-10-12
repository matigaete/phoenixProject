import { Component, OnInit, Input } from '@angular/core'; 
import { Producto } from 'src/app/Clases/producto';

@Component({
  selector: 'app-search-product',
  template:  `<div class="Container">
                <div class="row">
                    <div class="col">
                        <app-find (filtro)="refresh($event)"></app-find>
                        <app-lista-productos (producto)="enviaProducto($event)" [filtro]=filtro></app-lista-productos>
                    </div>
                    <div class="col">
                        <app-create-product *ngIf="iValor == 2"  [iProducto]="producto"></app-create-product>
                        <app-info-productos   *ngIf="iValor == 3"  [iProducto]="producto" (oValor)="enviaAccion($event)"></app-info-productos>
                    </div>
                </div>
              </div>`,
  styles: []
})
export class SearchProductComponent implements OnInit {

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

