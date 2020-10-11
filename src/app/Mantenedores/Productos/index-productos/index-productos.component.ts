import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../Servicios/business.service';
import { Ilista } from '../../../Interfaces/ilista';
import { Producto } from 'src/app/Clases/producto'; 

@Component({
  selector: 'app-index-productos',
  template: ` <nav>
                <ul class="pagination justify-content-center">
                  <mat-button-toggle-group class="justify-content-center">
                    <mat-button-toggle *ngFor="let a of acciones" 
                    (click)="asignarOpcion(a.id)">{{a.nombre}}</mat-button-toggle> 
                  </mat-button-toggle-group> 
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

  constructor(private businessService: BusinessService) { }

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
