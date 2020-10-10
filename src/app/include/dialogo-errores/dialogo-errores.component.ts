import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-errores',
  template: ` <h1 mat-dialog-title>Se presentaron los siguientes errores:</h1>
              <div mat-dialog-content *ngFor="let e of errores">
                <h6>■ {{e}}</h6>
              </div>
              <div mat-dialog-actions>
                <button mat-button mat-dialog-close>Cerrar</button>
              </div>`,
  styleUrls: ['./dialogo-errores.component.css']
})
export class DialogoErroresComponent implements OnInit {

  constructor(public dialogo: MatDialogRef<DialogoErroresComponent>,
    @Inject(MAT_DIALOG_DATA) public errores: string[]) { }

  ngOnInit(): void {
  }

}
