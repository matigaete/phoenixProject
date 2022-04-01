import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/Interfaces/persona';
import { PersonaService } from 'src/app/Servicios/persona.service';

@Component({
  selector: 'app-lista-proveedores',
  template: `<mat-card class="card-extend">
              <mat-card-header>
                <mat-card-title>Lista de proveedores</mat-card-title>
              </mat-card-header>
              <mat-card-content>
              <select multiple class="form-control" [(ngModel)]="selectedP" (ngModelChange)="enviaProveedor($event)">
                  <option [ngValue]="p" *ngFor="let p of (proveedores$ | async)">{{p.rut | rut}} - {{p.nombre}}</option> 
                </select>
              </mat-card-content>
            </mat-card>
            <br>`,
  styles: []
})
export class ListaProveedoresComponent implements OnInit {

  @Output() oPersona = new EventEmitter<Persona>();
  public selectedP: Persona = {};
  public proveedores$: Observable<Persona[]>; 

  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.proveedores$ = this.personaService.getListaProveedores();
  }

  enviaProveedor(persona: Persona){
    this.oPersona.emit(persona);
  }

}
