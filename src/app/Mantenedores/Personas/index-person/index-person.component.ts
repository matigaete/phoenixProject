import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comuna } from 'src/app/Clases/comuna';
import { Persona } from 'src/app/Clases/persona';
import { Provincia } from 'src/app/Clases/provincia';
import { Region } from 'src/app/Clases/region';

@Component({
  selector: 'app-index-person',
  template: `<div class="Container">
              <div class="row">
                <div class="col">
                  <app-create-person [iPersona]="personaModel"></app-create-person>
                </div>
                <div class="col">
                  <app-lista-clientes (oPersona)="enviaPersona($event)"></app-lista-clientes>
                  <app-lista-proveedores (oPersona)="enviaPersona($event)"></app-lista-proveedores>
                  <app-info-personas></app-info-personas>
                </div>
              </div>
            </div>`,
  styles: []
})

export class IndexPersonComponent implements OnInit {

  public personaModel: Persona;
  public regiones$: Observable<Region[]>;
  public provincias$: Observable<Provincia[]>;
  public comunas$: Observable<Comuna[]>;

  constructor() { }

  ngOnInit(): void {
  }

  public enviaPersona(persona : Persona){
    this.personaModel = persona;
  }


}
