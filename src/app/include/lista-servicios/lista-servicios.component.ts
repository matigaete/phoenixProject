import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Servicio } from '../../Clases/servicio';
import { plainToClass } from 'class-transformer';
import { ServiciosService } from 'src/app/Servicios/servicios.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-servicios',
  template: `<div class="form-group">
                <label>Lista de Servicios:</label>
                <select multiple class="form-control" [(ngModel)]="selectedS" (ngModelChange)="enviaServicio($event)">
                  <option [ngValue]="p" *ngFor="let p of (servicios$ | async)">{{p.nombre}}</option> 
                </select>
              </div>`,
  styles: []
})
export class ListaServiciosComponent implements OnInit {

  @Output() servicio = new EventEmitter<Servicio>();   
  public selectedS: Servicio;  
  public servicios$: Observable<Servicio[]>;

  constructor(private servicioService: ServiciosService) { }

  public ngOnInit(): void {
      this.servicios$ = this.servicioService.getServicios();
  }

  public ngOnChanges(): void {
    this.servicios$ = this.servicioService.getServicios();
  }

  public enviaServicio(event: any) {
    let servicio = plainToClass(Servicio, event);
    this.servicio.emit(servicio);
  }

}
