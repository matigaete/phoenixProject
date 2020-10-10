import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialogo-confirmacion',
  template: `<h1 mat-dialog-title>Confirmación</h1>
              <mat-dialog-content>
                  <p>{{mensaje}}</p>
              </mat-dialog-content>
              <mat-dialog-actions>
                  <button mat-button mat-dialog-close>No</button>
                  <button mat-button (click)="confirmado()" cdkFocusInitial>Sí</button>
              </mat-dialog-actions>`,
  styles: []
})
export class DialogoConfirmacionComponent implements OnInit {

  constructor(
    public dialogo: MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

  cerrarDialogo(): void {
    this.dialogo.close(false);
  }
  confirmado(): void {
    this.dialogo.close(true);
  }

  ngOnInit() {
  }

}