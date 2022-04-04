import { Component, OnInit, Input } from '@angular/core';
import { Servicio } from 'src/app/Interfaces/servicio';

@Component({
  selector: 'app-search-service',
  templateUrl: './search-service.component.html',
  styles: []
})
export class SearchServiceComponent implements OnInit {

  @Input() iValor: number;
  public filtro: number;
  public servicio: Servicio;

  public ngOnInit(): void {
    console.log('search');
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
