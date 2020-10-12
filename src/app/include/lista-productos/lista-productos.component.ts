import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../Clases/producto';
import { plainToClass } from 'class-transformer';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-productos',
  template: `<div class="form-group">
                <label>Lista de Productos:</label>
                <select multiple class="form-control" [(ngModel)]="selectedP" (ngModelChange)="enviaProducto($event)">
                  <option [ngValue]="p" *ngFor="let p of (productos$ | async)">{{p.nombre}}</option> 
                </select>
              </div>`,
  styles: []
})
export class ListaProductosComponent implements OnInit {

  @Output() producto = new EventEmitter<Producto>();
  @Input() filtro: string; 
  public selectedP: Producto; 
  public productos$: Observable<Producto[]>;

  constructor(private productoService: ProductosService) { }

  public ngOnInit(): void {
    this.productos$ = this.productoService.getProductosFiltro(this.filtro);
  }

  public ngOnChanges(): void {
    this.productos$ = this.productoService.getProductosFiltro(this.filtro);
  }

  public enviaProducto(event: any) {
    let producto = plainToClass(Producto, event);
    this.producto.emit(producto);
  }

}
