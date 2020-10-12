import { Component, OnInit, Input } from '@angular/core';
import { Servicio } from 'src/app/Clases/servicio';

@Component({
  selector: 'app-search-service',
  template: `<div class="Container">
                <div class="row">
                    <div class="col">
                        <app-lista-servicios (servicio)="enviaServicio($event)"></app-lista-servicios>
                        <app-info-servicios></app-info-servicios>
                    </div>
                    <div class="col">
                        <app-create-service [iServicio]="servicio"></app-create-service>
                    </div>
                </div>
              </div>`,
  styles: []
})
export class SearchServiceComponent implements OnInit {

  @Input() iValor: number;
  public filtro: number;
  public servicio: Servicio;

  constructor() { }

  public ngOnInit(): void {
  }

  public refresh(filtro: number) {
    this.filtro = filtro;
  }

  public enviaServicio(Servicio: Servicio) {
    this.servicio = Servicio;
  }

  public enviaAccion(oValor: number) {
    this.iValor = oValor;
  }

}
