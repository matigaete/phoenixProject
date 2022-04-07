import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from 'src/app/Interfaces/producto';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { Ilista } from 'src/app/Interfaces/ilista';
import { MatDialog } from '@angular/material/dialog';
import { DialogoColumnaComponent } from '../dialogo-columna/dialogo-columna.component';
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

  @ViewChild('paginator', { read: MatPaginator }) paginator: MatPaginator;
  dataSource = new MatTableDataSource<Producto>();
  jsonProductos: Producto[];
  textColumns: Ilista[];
  priceColumns: Ilista[];
  buttonColumn: Ilista[];
  allColumns: Ilista[];
  columnsToDisplay: string[] = [];
  columnsOculted: Ilista[] = [];

  constructor(private businessService: BusinessService,
    private productoService: ProductosService,
    private dialogo: MatDialog) { }

  ngOnInit(): void {
    this.productoService.getProductos()
      .subscribe((jsonProductos: Producto[]) => {
        this.jsonProductos = jsonProductos;
        this.dataSource = new MatTableDataSource<Producto>(this.jsonProductos);
        this.dataSource.paginator = this.paginator;
      });
    this.asignValues();
    this.columnsToDisplay = this.getColumns();
  }

  addColumn() {
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

  removeColumn(lista: Ilista) {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.splice(this.columnsToDisplay.indexOf(lista.nombre), 1);
      lista.current = false;
      this.columnsOculted.push(lista);
    }
  }

  getColumns() {
    const aux = [];
    for (let i = 0; i < this.allColumns.length; i++) {
      aux.push(this.allColumns[i].nombre);
    }
    return aux;
  }

  asignValues() {
    this.textColumns = [
      { id: 0, nombre: 'id', tipo: '#' },
      { id: 1, nombre: 'nombre', tipo: 'Nombre' },
      { id: 2, nombre: 'descripcion', tipo: 'Descripción' },
      { id: 3, nombre: 'categoria', tipo: 'Categoría' },
      { id: 4, nombre: 'stock', tipo: 'Cantidad disponible' },
      { id: 5, nombre: 'stockCritico', tipo: 'Stock Critico' },
    ];
    this.priceColumns = [
      { id: 6, nombre: 'precioCompra', tipo: '$ Compra' },
      { id: 7, nombre: 'precioVenta', tipo: '$ Venta' }
    ];
    this.buttonColumn = [
      { id: 8, nombre: 'eliminar', tipo: 'Dar de baja' }
    ];
    this.allColumns = this.textColumns.concat(this.priceColumns, this.buttonColumn);
  }

  eliminaProducto(producto: Producto) {
    this.productoService.eliminarProducto(producto)
      .afterClosed().
      subscribe((confirmado: boolean) => {
        if (!confirmado) return;
        this.productoService.eliminaProducto(producto.id)
          .subscribe(() => {
            this.businessService.getAlert('Producto dado de baja');
            this.jsonProductos.splice(this.jsonProductos.indexOf(producto), 1);
            this.dataSource = new MatTableDataSource<Producto>(this.jsonProductos);
            //this.dataSource.next(this.jsonProductos);
          });
      });
  }

}
