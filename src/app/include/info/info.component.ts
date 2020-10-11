import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BusinessService } from 'src/app/Servicios/business.service';
import { Producto } from 'src/app/Clases/producto';
import { ProductosService } from 'src/app/Servicios/productos.service';

@Component({
  selector: 'app-info',
  template: `<div class="card">
                <div class="card-header">
                  {{productoModel.nombre}}
                </div>
                <div class="card-body">
                  <h5 class="card-title">Información:</h5>
                  <p class="card-text">{{productoModel.descripcion}}</p>
                  <p class="card-text">Stock disponible: {{productoModel.stock}}</p>
                  <p class="card-text">Stock crítico: {{productoModel.stockCritico}}</p>
                  <p class="card-text">Último precio de compra: {{ productoModel.precioCompra | currency : "CLP"}}</p>
                  <p class="card-text">Precio de venta: {{ productoModel.precioVenta | currency : "CLP"}}</p>
                  <a class="btn btn-primary {{disabled}}" (click)="asignarOpcion(2)">{{modificar}}</a>
                </div>
              </div>`,
  styles: []
})
export class InfoComponent implements OnInit {

  @Output() oValor = new EventEmitter<number>();
  @Input() iProducto: Producto;
  public productoModel = new Producto('','','',0,0,0,0,false,'')
  public modificar: string;
  public disabled: string;

  constructor(private businessService: BusinessService,
    private productoService: ProductosService) { }

  public ngOnInit(): void {
    this.productoModel.nombre = this.productoService.nombre;
    this.productoModel.descripcion = this.productoService.info;
    this.modificar = this.businessService.getAcciones()[1].nombre;
  }

  public ngDoCheck(): void {
    if (this.iProducto !== undefined) {
      this.productoModel = this.iProducto[0];
      this.disabled = null;
    }
    else {
      this.disabled = this.businessService.disabled;
    }
  }

  public asignarOpcion(option: number): void {
    this.oValor.emit(option);
  }

}
