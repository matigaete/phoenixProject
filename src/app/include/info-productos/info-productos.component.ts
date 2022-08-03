import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BusinessService } from 'src/app/Servicios/business.service';
import { Producto } from 'src/app/Interfaces/producto';
import { ProductosService } from 'src/app/Servicios/productos.service';

@Component({
  selector: 'app-info-productos',
  templateUrl: './info-productos.component.html',
  styles: []
})
export class InfoProductosComponent implements OnInit {

  @Output() oValor = new EventEmitter<number>();
  @Input() iProducto: Producto;
  public productoModel: Producto = {};
  public modificar: string;
  public disabled: string;

  constructor(private businessService: BusinessService,
    private productoService: ProductosService) { }

  public ngOnInit(): void {
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
