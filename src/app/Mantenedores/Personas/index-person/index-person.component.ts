import { Component, OnInit } from '@angular/core';
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
  clientes: Persona[];
  proveedores: Persona[];

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.personaService.getPersonas().subscribe((personas) => {
      this.clientes = personas.filter(clientes => clientes.tipo === TipoPersona.Cliente);
      this.proveedores = personas.filter(clientes => clientes.tipo === TipoPersona.Proveedor);
    });
  }

  enviaPersona(persona : Persona){
    this.personaModel = persona;
  }


}
