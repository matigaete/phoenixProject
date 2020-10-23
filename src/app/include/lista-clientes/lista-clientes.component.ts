import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { plainToClass } from 'class-transformer';
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
                <select multiple class="form-control" [(ngModel)]="selectedC" (ngModelChange)="enviaCliente($event)">
                  <option [ngValue]="c" *ngFor="let c of (clientes$ | async)">{{c.rut | rut}} - {{c.nombre}}</option> 
                </select>
              </mat-card-content>
            </mat-card>
            <br>`,
  styles: []
})
export class ListaClientesComponent implements OnInit {

  @Output() oPersona = new EventEmitter<Persona>();
  public selectedC = Persona;
  public clientes$: Observable<Persona[]>; 

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.clientes$ = this.personaService.getListaClientes();
  }

  enviaCliente(event: any){
    let persona = plainToClass(Persona, event);
    this.oPersona.emit(persona);
  }

}
