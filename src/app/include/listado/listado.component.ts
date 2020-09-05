import { Component, OnInit } from '@angular/core'; 
import { Producto } from 'src/app/Clases/producto'; 
import { ProductosService } from 'src/app/Servicios/productos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Ilista } from 'src/app/Interfaces/ilista';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogoColumnaComponent } from '../dialogo-columna/dialogo-columna.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listado',
  template:  `<button mat-raised-button (click)="addColumn()"> 
                <mat-icon >add</mat-icon>
                Añadir columnas
              </button> 
              <table mat-table [dataSource]="jsonProductos" class="mat-elevation-z8">
                <ng-container [matColumnDef]="column.nombre" *ngFor="let column of textColumns">
                  <th mat-header-cell *matHeaderCellDef> 
                    {{column.tipo}} 
                    <button mat-icon-button (click)="removeColumn(column)">
                      <mat-icon>remove_circle</mat-icon>
                    </button>
                  </th>
                  <td mat-cell *matCellDef="let producto"> {{producto[column.nombre]}} </td>
                </ng-container>
                <ng-container [matColumnDef]="column.nombre" *ngFor="let column of priceColumns">
                  <th mat-header-cell *matHeaderCellDef> {{column.tipo}}
                    <button mat-icon-button (click)="removeColumn(column)">
                      <mat-icon>remove_circle</mat-icon>
                    </button>
                  </th>
                  <td mat-cell *matCellDef="let producto"> {{producto[column.nombre] | currency : 'CLP'}} </td>
                </ng-container>
                <ng-container matColumnDef="eliminar">
                  <th mat-header-cell *matHeaderCellDef>{{bajar}}</th>
                  <td mat-cell *matCellDef="let producto">
                    <button mat-icon-button (click)="bajarProducto(producto)">
                      <mat-icon color="warn">delete</mat-icon>
                    </button>
                  </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
                <tr mat-row *matRowDef="let row; columns: columnsToDisplay;"></tr>
              </table>`,
  styles: [ `table {
              width: 100%;
            }
            
            .mat-form-field {
              font-size: 14px;
              width: 100%;
            }` ]
})
export class ListadoComponent implements OnInit {

  public bajar : string;
  public jsonProductos : any;
  public textColumns : Ilista[] = [{nombre:'codigo',tipo:'#'},
                                  {nombre:'nombre',tipo:'Nombre'}, 
                                  {nombre:'descripcion',tipo:'Descripción'} ,
                                  {nombre:'tipo',tipo:'Categoría'} , 
                                  {nombre:'stock',tipo:'Cantidad disponible'} , 
                                  {nombre:'stockCritico',tipo:'Stock Critico'} ,];
  public priceColumns : Ilista[] = [{nombre:'precioCompra',tipo:'$ Compra'} , 
                                    {nombre:'precioVenta',tipo:'$ Venta'} ]; 
  public buttonColumn : Ilista[] = [{nombre:'eliminar',tipo:'Dar de baja'}];
  public allColumns : Ilista[] = this.textColumns.concat(this.priceColumns, this.buttonColumn);
  public columnsToDisplay : string[] = [];
  public columnsOculted : Ilista[] = [];

  constructor(private productoService : ProductosService,
    private dialogo: MatDialog,
    private snackBar: MatSnackBar) { 
    this.bajar = this.productoService.active;
  }

  ngOnInit(): void { 
    this.productoService.getListaProductos().subscribe(( jsonProductos : any ) => this.jsonProductos = jsonProductos);
    this.columnsToDisplay = this.getColumns();
  }

  addColumn() { 
    if (this.columnsOculted.length) {
      this.dialogo.open(DialogoColumnaComponent, {
        data: this.columnsOculted
        })
        .afterClosed().
        subscribe((lista: Ilista[]) => {
        lista.forEach(element => {
          if(element.current) { 
            this.columnsToDisplay.splice(this.columnsToDisplay.length - 1, 0 , element.nombre);
            this.columnsOculted.splice(this.columnsOculted.indexOf(element),1);
          }
        });
      })
    } else{
      this.snackBar.open(this.productoService.mensajeColumnas, undefined, {
        duration: 1500,
      });
    }
  }

  removeColumn(lista : Ilista) {  
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.splice(this.columnsToDisplay.indexOf(lista.nombre),1);
      this.columnsOculted.push(lista);
    } 
  }

  getColumns(){
    var aux = new Array;
    for (let i = 0; i < this.allColumns.length; i++) {
      aux.push(this.allColumns[i].nombre);
    }
    return aux;
  }

  bajarProducto(producto : Producto){
    this.productoService.bajarProducto(producto);
  }

}
