import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BusinessService } from '../../business.service'; 
import { Ilista } from 'src/app/Interfaces/ilista';
import { Producto } from '../../Clases/producto';

@Component({
  selector: 'app-lista',
  template:  `<div class="form-group">
                <label>Lista de productos:</label>
                <select multiple class="form-control" [(ngModel)]="selected" (ngModelChange)="enviaProducto($event)">
                  <option [value]="p" *ngFor="let p of productos">{{p.getNombre()}}</option> 
                </select>
              </div>`,
  styles: []
})
export class ListaComponent implements OnInit { 

  @Input() filtro : string;
  @Output() producto = new EventEmitter<Producto>();
  public selected : Producto; 
  public productos : Producto[];

  constructor(private businessService : BusinessService) { }

  ngOnInit(): void { 
    this.productos = this.businessService.filtrarProductos(this.productos, this.filtro);
  }

  ngDoCheck(): void{
    this.productos = this.businessService.filtrarProductos(this.productos, this.filtro); 
  }

  enviaProducto(event : Producto){
    this.producto.emit(event);
  }
  
}
