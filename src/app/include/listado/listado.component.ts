import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/Interfaces/producto';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { Ilista } from 'src/app/Interfaces/ilista';
import { MatDialog } from '@angular/material/dialog';
import { DialogoColumnaComponent } from '../dialogo-columna/dialogo-columna.component';
import { Subscription } from 'rxjs';
import { BusinessService } from 'src/app/Servicios/business.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`table {
              width: 100%;
            }
            
            .mat-form-field {
              font-size: 14px;
              width: 100%;
            }` ]
})
export class ListadoComponent implements OnInit {

  @ViewChild('paginatorA', { read: MatPaginator }) paginatorA: MatPaginator;
  @ViewChild('paginatorI', { read: MatPaginator }) paginatorI: MatPaginator;
  public subscriptions: Subscription[] = [];
  // public dataSourceA = new BehaviorSubject([]);
  // public dataSourceI = new BehaviorSubject([]);
  public dataSourceA = new MatTableDataSource<Producto>();
  public dataSourceI = new MatTableDataSource<Producto>();
  public jsonProductos: any;
  public jsonInactivos: any;
  public textColumns: Ilista[] = [
    { id: 0, nombre: 'codigo', tipo: '#' },
    { id: 1, nombre: 'nombre', tipo: 'Nombre' },
    { id: 2, nombre: 'descripcion', tipo: 'Descripción' },
    { id: 3, nombre: 'tipo', tipo: 'Categoría' },
    { id: 4, nombre: 'stock', tipo: 'Cantidad disponible' },
    { id: 5, nombre: 'stockCritico', tipo: 'Stock Critico' },
  ];
  public priceColumns: Ilista[] = [
    { id: 6, nombre: 'precioCompra', tipo: '$ Compra' },
    { id: 7, nombre: 'precioVenta', tipo: '$ Venta' }
  ];
  public buttonColumn: Ilista[] = [
    { id: 8, nombre: 'eliminar', tipo: 'Dar de baja' }
  ];
  public allColumns: Ilista[] = this.textColumns.concat(this.priceColumns, this.buttonColumn);
  public columnsToDisplay: string[] = [];
  public columnsOculted: Ilista[] = [];

  public inactiveColums: string[] = ['codigo', 'nombre', 'tipo', 'stock'];
  public activeColumn: string[] = ['activar'];
  public columnsToDisplayI: string[] = this.inactiveColums.concat(this.activeColumn);

  constructor(private businessService: BusinessService,
    private productoService: ProductosService,
    private dialogo: MatDialog) { }

  public ngOnInit(): void {
    this.subscriptions.push(
      this.productoService.getListaProductos()
        .subscribe((jsonProductos: any) => {
          this.jsonProductos = jsonProductos;
          this.dataSourceA = new MatTableDataSource<Producto>(this.jsonProductos);
          this.dataSourceA.paginator = this.paginatorA;
        }));
    this.subscriptions.push(
      this.productoService.getProductosInactivos()
        .subscribe((jsonInactivos: any) => {
          this.jsonInactivos = jsonInactivos;
          this.dataSourceI = new MatTableDataSource<Producto>(this.jsonInactivos);
          this.dataSourceI.paginator = this.paginatorI;
        }));
    this.columnsToDisplay = this.getColumns();
  }

  public addColumn() {
    if (this.columnsOculted.length) {
      const arrayOculted = [];
      this.dialogo.open(DialogoColumnaComponent, {
        data: this.columnsOculted
      })
        .afterClosed().
        subscribe((lista: Ilista[]) => {
          if (lista) {
            const col = this.columnsToDisplay;
            col.pop();
            lista.forEach(element => {
              if (element.current) col.splice(element.id, 0, element.nombre);
              else arrayOculted.push(element);
            });
            this.columnsOculted = arrayOculted;
            col.splice(col.length, 0, 'eliminar');
            this.columnsToDisplay = col;
          }
        });
    } else {
      this.businessService.getAlert('Todas las columnas están desplegadas');
    }
  }

  public removeColumn(lista: Ilista) {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.splice(this.columnsToDisplay.indexOf(lista.nombre), 1);
      lista.current = false;
      this.columnsOculted.push(lista);
    }
  }

  public getColumns() {
    const aux = [];
    for (let i = 0; i < this.allColumns.length; i++) {
      aux.push(this.allColumns[i].nombre);
    }
    return aux;
  }

  public bajarProducto(producto: Producto) {
    this.productoService.bajarProducto(producto)
      .afterClosed().
      subscribe((confirmado: boolean) => {
        if (!confirmado) return;
        this.productoService.bajaProducto(producto)
          .subscribe(() => {
            this.businessService.getAlert('Producto dado de baja');
            this.jsonProductos.splice(this.jsonProductos.indexOf(producto), 1);
            this.dataSourceA = new MatTableDataSource<Producto>(this.jsonProductos);
          });
        // this.dataSourceA.next(this.jsonProductos);
      });
  }

  public activarProducto(producto: Producto) {
    this.productoService.activarProducto(producto)
      .afterClosed().
      subscribe((confirmado: boolean) => {
        if (!confirmado) return;
        this.productoService.activaProducto(producto)
          .subscribe(() => {
            this.businessService.getAlert('Producto activado');
            this.jsonInactivos.splice(this.jsonInactivos.indexOf(producto), 1);
            this.dataSourceI = new MatTableDataSource<Producto>(this.jsonInactivos);
          });
        // this.dataSourceI.next(this.jsonInactivos);
      });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
