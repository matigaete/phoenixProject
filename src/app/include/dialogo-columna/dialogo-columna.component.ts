import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ilista } from 'src/app/Interfaces/ilista';
@Component({
  selector: 'app-dialogo-columna',
  template: `<h1 mat-dialog-title>Columnas disponibles</h1>
              <mat-dialog-content>
                <div class="form-group" *ngFor="let c of columnas">
                  <mat-checkbox  [(ngModel)]="c.current"
                  name="column">
                      <label class="form-check-label">{{c.tipo}}</label>
                  </mat-checkbox> 
                </div>  
              </mat-dialog-content>
              <mat-dialog-actions>
                  <button mat-button (click)="cerrarDialogo()">No</button>
                  <button mat-button (click)="confirmado()" cdkFocusInitial>Sí</button>
              </mat-dialog-actions>`,
  styles: []
})
export class DialogoColumnaComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogoColumnaComponent>,
    @Inject(MAT_DIALOG_DATA) public columnas: Ilista[]) { }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.dialogo.close(this.columnas); 
    }

  ngOnInit() {
  }

}