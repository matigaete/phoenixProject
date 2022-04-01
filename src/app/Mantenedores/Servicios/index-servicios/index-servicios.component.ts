import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/Servicios/business.service';
import { Ilista } from 'src/app/Interfaces/ilista';
import { Servicio } from 'src/app/Interfaces/servicio'; 

@Component({
  selector: 'app-index-servicios',
  template: ` <div class="container">   
                <app-search-service [iValor]="option"></app-search-service>   
              </div>`,
  styles: []
})

export class IndexServiciosComponent implements OnInit {

  public acciones: Ilista[];
  public option: number;
  public current: string;
  public jsonProducto: any;
  public productos: Servicio[] = [];

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
