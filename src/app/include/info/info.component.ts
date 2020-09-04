import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BusinessService } from 'src/app/Servicios/business.service';
import { Producto } from 'src/app/Clases/producto'; 
import { ProductosService } from 'src/app/Servicios/productos.service';

@Component({
  selector: 'app-info',
  template:  `<div class="card">
                <div class="card-header">
                  {{nombre}}
                </div>
                <div class="card-body">
                  <h5 class="card-title">Información:</h5>
                  <p class="card-text">{{info}}</p>
                  <p class="card-text">Stock disponible: {{stock}}</p>
                  <p class="card-text">Stock crítico: {{stockCritico}}</p>
                  <p class="card-text">Último precio de compra: {{ precioCompra | currency : "CLP"}}</p>
                  <p class="card-text">Precio de venta: {{ precioVenta | currency : "CLP"}}</p>
                  <a class="btn btn-primary {{disabled}}" (click)="asignarOpcion(2)">{{modificar}}</a>
                </div>
              </div>`,
  styles: []
})
export class InfoComponent implements OnInit {

  @Output() oValor = new EventEmitter<number>(); 
  @Input() iProducto : Producto;
  public nombre : string; 
  public info : string; 
  public modificar : string; 
  public stock : number;
  public stockCritico : number;
  public precioCompra : number;
  public precioVenta : number; 
  public disabled : string;

  constructor( private businessService : BusinessService,
               private productoService : ProductosService ) { }

  public ngOnInit(): void { 
    this.nombre = this.productoService.nombre;
    this.modificar = this.businessService.getAcciones()[1].nombre; 
    this.info = this.productoService.info;
    this.stock = 0;
    this.stockCritico = 0;
    this.precioCompra = 0;
    this.precioVenta = 0;
  }

  public ngDoCheck(): void{ 
    if (this.iProducto !== undefined) {
      var product = this.iProducto[0];
      this.nombre = product.nombre; 
      this.info = product.descripcion;
      this.stock = product.stock;
      this.stockCritico = product.stockCritico;
      this.precioCompra = product.precioCompra;
      this.precioVenta = product.precioVenta;
      this.disabled = null;
    }
    else{
      this.disabled = this.businessService.disabled;
    }
  }

  public asignarOpcion(option : number) : void {
    this.oValor.emit(option); 
  }

}
