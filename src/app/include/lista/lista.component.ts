import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BusinessService } from '../../business.service';  
import { Producto } from '../../Clases/producto';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-lista',
  template:  `<div class="form-group">
                <label>Lista de productos:</label>
                <select multiple class="form-control" [(ngModel)]="selected" (ngModelChange)="enviaProducto($event)">
                  <option [ngValue]="p" *ngFor="let p of jsonProductos">{{p.nombre}}</option> 
                </select>
              </div>`,
  styles: []
})
export class ListaComponent implements OnInit { 

  @Output() producto = new EventEmitter<Producto>();
  @Input() filtro : string;
  public selected : Producto; 
  public productos : Producto[];
  public jsonProductos : Response;

  constructor(private businessService : BusinessService) { }

  public ngOnInit(): void { 
    this.businessService.getProductosFiltro(this.filtro).subscribe(( JsonProductos : Response ) => this.jsonProductos = JsonProductos);
  }

  public ngOnChanges(): void{
    this.businessService.getProductosFiltro(this.filtro).subscribe(( JsonProductos : Response ) => this.jsonProductos = JsonProductos);
  }

  public enviaProducto(event : Response){
    let producto = plainToClass(Producto, event);
    this.producto.emit(producto);
  }
  
}
