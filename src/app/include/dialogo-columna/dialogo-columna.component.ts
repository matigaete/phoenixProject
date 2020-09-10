import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ilista } from 'src/app/Interfaces/ilista';
@Component({
  selector: 'app-dialogo-columna',
  template: `<h1 mat-dialog-title>Columnas disponibles</h1>
              <mat-dialog-content> 
                <table mat-table [dataSource]="columnas">
                  <!-- Checkbox Column -->  
                  <ng-container matColumnDef="current">
                    <th mat-header-cell *matHeaderCellDef="let row">   
                        <mat-checkbox [(ngModel)]="chkAll" [value]="chkAll" (ngModelChange)="selectAll()">
                          Seleccionar todo
                        </mat-checkbox> 
                    </th>
                    <td mat-cell *matCellDef="let c"> 
                    <mat-checkbox  [(ngModel)]="c.current">
                      <label class="form-check-label">{{c.tipo}}</label>
                  </mat-checkbox> 
                    </td> 
                  </ng-container> 
                  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr> 
                </table> 
              </mat-dialog-content>
              <mat-dialog-actions>
                  <button mat-button (click)="cerrarDialogo()">No</button>
                  <button mat-button (click)="confirmado()" cdkFocusInitial>Sí</button>
              </mat-dialog-actions>`,
  styles: []
})
export class DialogoColumnaComponent implements OnInit {

  chkAll : boolean;
  displayedColumns = ['current'];

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

  btnClick(){
  }

  selectAll(){ 
    this.columnas.map(column => column.current = this.chkAll); 
  }

}