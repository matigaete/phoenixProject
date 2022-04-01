import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/Servicios/business.service';
import { Ilista } from 'src/app/Interfaces/ilista';
import { Producto } from 'src/app/Interfaces/producto'; 

@Component({
  selector: 'app-index-productos',
  templateUrl: './index-productos.component.html',
  styles: []
})
export class IndexProductosComponent implements OnInit {

  public acciones: Ilista[];
  public option: number;
  public current: string;
  public jsonProducto: any;
  public productos: Producto[] = [];

  constructor(private businessService: BusinessService) { }

  public ngOnInit(): void {
    this.acciones = this.businessService.getAcciones();
    this.option = this.businessService.option;
    // this.acciones[this.option - 1].current = this.businessService.active;
  }

  public ngDoCheck(): void {
    this.option = this.businessService.option;
    // this.acciones[this.option - 1].current = this.businessService.active;
  }

  public asignarOpcion(option: number): void {
    this.acciones = this.businessService.asignarOpcion(option, this.acciones);
    this.option = this.businessService.option;
  }
}
