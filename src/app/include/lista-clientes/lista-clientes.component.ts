import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/Clases/persona';
import { PersonaService } from 'src/app/Servicios/persona.service';

@Component({
  selector: 'app-lista-clientes',
  template: `<mat-card class="card-extend">
              <mat-card-header>
                  <mat-card-title>Lista de Clientes</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <select multiple class="form-control" [(ngModel)]="oPersona" (ngModelChange)="enviaCliente($event)">
                  <option [ngValue]="p" *ngFor="let p of (clientes$ | async)">{{p.nombre}}</option> 
                </select>
              </mat-card-content>
            </mat-card>
            <br>`,
  styles: []
})
export class ListaClientesComponent implements OnInit {

  @Output() oPersona = new EventEmitter<Persona>();
  public clientes$: Observable<Persona[]>; 

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.clientes$ = this.personaService.getClientesFiltro('%');
  }

  enviaCliente(persona: Persona){

  }

}
