import { Component, OnInit } from '@angular/core'; 
import { Producto } from 'src/app/Clases/producto'; 
import { ProductosService } from 'src/app/Servicios/productos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Ilista } from 'src/app/Interfaces/ilista';

@Component({
  selector: 'app-listado',
  template:  `<button mat-raised-button (click)="addColumn()"> 
                <mat-icon >add</mat-icon>
                Add column 
              </button> 
              <table mat-table [dataSource]="jsonProductos" class="mat-elevation-z8">
                <ng-container [matColumnDef]="column.nombre" *ngFor="let column of textColumns">
                  <th mat-header-cell *matHeaderCellDef> 
                    {{column.tipo}} 
                    <button mat-icon-button (click)="bajarProducto(producto)">
                      <mat-icon>remove_circle</mat-icon>
                    </button>
                  </th>
                  <td mat-cell *matCellDef="let producto"> {{producto[column.nombre]}} </td>
                </ng-container>
                <ng-container [matColumnDef]="column.nombre" *ngFor="let column of priceColumns">
                  <th mat-header-cell *matHeaderCellDef> {{column.tipo}}
                    <button mat-icon-button (click)="bajarProducto(producto)">
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
  public buttonColumn: Ilista[] = [{nombre:'eliminar',tipo:'Dar de baja'}];
  public allColumns: Ilista[] = this.textColumns.concat(this.priceColumns, this.buttonColumn);
  public columnsToDisplay: string[];

  constructor(private productoService : ProductosService) { 
    this.bajar = this.productoService.active;
  }

  ngOnInit(): void { 
    this.productoService.getListaProductos().subscribe(( jsonProductos : any ) => this.jsonProductos = jsonProductos);
    this.columnsToDisplay = this.getColumns();
  }

  addColumn() { 
    // this.columnsToDisplay.push(this.allColumns[0]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
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
