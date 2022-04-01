import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ilista } from 'src/app/Interfaces/ilista';
@Component({
  selector: 'app-dialogo-columna',
  templateUrl: './dialogo-columna.component.html',
  styles: []
})
export class DialogoColumnaComponent implements OnInit {

  chkAll: boolean;
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

  btnClick() {
  }

  selectAll() {
    this.columnas.map(column => column.current = this.chkAll);
  }

}