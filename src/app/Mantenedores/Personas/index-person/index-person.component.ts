import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Comuna } from 'src/app/Clases/comuna';
import { Persona } from 'src/app/Clases/persona';
import { Provincia } from 'src/app/Clases/provincia';
import { Region } from 'src/app/Clases/region';
import { BusinessService } from 'src/app/Servicios/business.service';
import { PersonaService } from 'src/app/Servicios/persona.service';

@Component({
  selector: 'app-index-person',
  template: `<div class="Container">
              <div class="row">
                <div class="col">
                  <app-create-person></app-create-person>
                </div>
                <div class="col">
                  <app-lista-clientes></app-lista-clientes>
                  <app-lista-proveedores></app-lista-proveedores>
                  <app-info-personas></app-info-personas>
                </div>
              </div>
            </div>`,
  styles: []
})

export class IndexPersonComponent implements OnInit {

  public personaModel: Persona = new Persona('', '', '', '', '', '', '', '', '');
  public regiones$: Observable<Region[]>;
  public provincias$: Observable<Provincia[]>;
  public comunas$: Observable<Comuna[]>;

  constructor(private businessService: BusinessService,
    private personaService: PersonaService,) { }

  ngOnInit(): void {
  }

}
