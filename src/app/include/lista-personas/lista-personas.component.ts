import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Persona } from 'src/app/Interfaces/persona';

@Component({
  selector: 'app-lista-personas',
  templateUrl: './lista-personas.component.html',
  styles: []
})
export class ListaPersonasComponent implements OnInit {

  @Input()
    personas: Persona[];

  @Output() oPersona = new EventEmitter<Persona>();
  persona: Persona = {};

  ngOnInit(): void {
    console.log('lista');
  }

  enviaPersona(persona: Persona){
    this.oPersona.emit(persona);
  }

}
