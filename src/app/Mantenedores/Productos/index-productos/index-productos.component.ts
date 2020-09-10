import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../Servicios/business.service';
import { Ilista } from '../../../Interfaces/ilista';
import { Producto } from 'src/app/Clases/producto';
import { ProductosService } from 'src/app/Servicios/productos.service';

@Component({
  selector: 'app-index-productos',
  template: `<nav>
                <ul class="pagination justify-content-center">
                  <li *ngFor="let a of acciones" class="page-item {{a.current}}" role="button">  
                    <a class="page-link" (click)="asignarOpcion(a.id)">
                      {{a.nombre}} 
                    </a>
                  </li> 
                </ul>
              </nav>
              <div class="container">  
                <app-create  *ngIf="option == 1" [isNew]="option"></app-create>
                <app-search  *ngIf="option == 2" [iValor]="option"></app-search>
                <app-search  *ngIf="option == 3" [iValor]="option"></app-search> 
                <app-listado *ngIf="option == 4"></app-listado> 
              </div>`,
  styles: []
})
export class IndexProductosComponent implements OnInit {

  public acciones: Ilista[];
  public option: number;
  public current: string;
  public jsonProducto: any;
  public productos: Producto[] = [];

  constructor(private businessService: BusinessService,
    private productoService: ProductosService) { }

  public ngOnInit(): void {
    this.acciones = this.businessService.getAcciones();
    this.option = this.businessService.option;
    this.acciones[this.option - 1].current = this.businessService.active;
  }

  public ngDoCheck(): void {
    this.option = this.businessService.option;
    this.acciones[this.option - 1].current = this.businessService.active;
  }

  public asignarOpcion(option: number): void {
    this.acciones = this.businessService.asignarOpcion(option, this.acciones);
    this.option = this.businessService.option;
  }
}
