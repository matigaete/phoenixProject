import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/Interfaces/persona';
import { PersonaService } from 'src/app/Servicios/persona.service';
import { TipoPersona } from 'src/app/Utils/persona.constants';

@Component({
  selector: 'app-index-person',
  templateUrl: './index-person.component.html',
  styles: []
})

export class IndexPersonComponent implements OnInit {

  personaModel: Persona;
  clientes$: Observable<Persona[]>;
  proveedores$: Observable<Persona[]>;

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.clientes$ = this.personaService.getPersonas(TipoPersona.Cliente);
    this.proveedores$ = this.personaService.getPersonas(TipoPersona.Proveedor);
  }

  enviaPersona(persona : Persona){
    this.personaModel = persona;
  }


}
