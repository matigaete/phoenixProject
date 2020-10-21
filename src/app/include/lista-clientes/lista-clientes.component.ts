import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-clientes',
  template: `<mat-card class="card-extend">
              <mat-card-header>
                  <mat-card-title>Lista de Clientes</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                  <select multiple class="form-control">
                  </select>
              </mat-card-content>
            </mat-card>
            <br>`,
  styles: []
})
export class ListaClientesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
