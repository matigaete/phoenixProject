import { Component, OnInit } from '@angular/core'; 
import { Producto } from 'src/app/Clases/producto'; 
import { ProductosService } from 'src/app/Servicios/productos.service'; 
import { Ilista } from 'src/app/Interfaces/ilista'; 
import { MatDialog } from '@angular/material/dialog';
import { DialogoColumnaComponent } from '../dialogo-columna/dialogo-columna.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { plainToClass } from 'class-transformer';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
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
  public dataSource = new BehaviorSubject([]);
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
    setTimeout( () => { 
      this.dataSource.next(this.jsonProductos);
    }, 100 );
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

  bajarProducto(event : any){
    let producto = plainToClass(Producto, event);
    this.productoService.bajarProducto(producto)
    .afterClosed().
      subscribe((confirmado: Boolean) => {
      if (!confirmado) return;
      this.productoService.bajaProducto(producto).subscribe(() => { 
        this.snackBar.open(this.productoService.mensajeBajado, undefined, {
          duration: 1500,
        });
      });
      this.jsonProductos.splice(this.jsonProductos.indexOf(event),1); 
      this.dataSource.next(this.jsonProductos);
    }); 
  }

}
