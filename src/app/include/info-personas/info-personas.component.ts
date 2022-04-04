import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-personas',
  template: `<mat-card class="card-extend">
              <mat-card-header>
                  <div mat-card-avatar>
                      <mat-icon>help</mat-icon>
                  </div>
                  <mat-card-title>Información</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                  - Creación de persona: para la creación de una persona, ingrese los valores en los campos correspondintes
                  <br>
                  - Modificación de persona: para modificar una persona, selecciona una persona de la lista, ajusta los valores
                  y luego pulsa aceptar
              </mat-card-content>
            </mat-card>`,
  styles: []
})
export class InfoPersonasComponent implements OnInit {

  ngOnInit() {
    console.log('info');
  }

}
