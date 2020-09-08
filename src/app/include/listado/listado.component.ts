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
  public dataSourceA = new BehaviorSubject([]);
  public dataSourceI = new BehaviorSubject([]);
  public jsonProductos : any;
  public jsonInactivos : any;
  public textColumns : Ilista[] = [{id:0,nombre:'codigo',tipo:'#'},
                                  {id:1,nombre:'nombre',tipo:'Nombre'}, 
                                  {id:2,nombre:'descripcion',tipo:'Descripción'} ,
                                  {id:3,nombre:'tipo',tipo:'Categoría'} , 
                                  {id:4,nombre:'stock',tipo:'Cantidad disponible'} , 
                                  {id:5,nombre:'stockCritico',tipo:'Stock Critico'} ,];
  public priceColumns : Ilista[] = [{id:6,nombre:'precioCompra',tipo:'$ Compra'} , 
                                    {id:7,nombre:'precioVenta',tipo:'$ Venta'} ]; 
  public buttonColumn : Ilista[] = [{id:8,nombre:'eliminar',tipo:'Dar de baja'}];
  public allColumns : Ilista[] = this.textColumns.concat(this.priceColumns, this.buttonColumn);
  public columnsToDisplay : string[] = [];
  public columnsOculted : Ilista[] = [];

  public inactiveColums : string[] = ['codigo', 'nombre', 'tipo', 'stock'];
  public activeColumn : string[] = ['activar'];
  public columnsToDisplayI : string[] = this.inactiveColums.concat(this.activeColumn);

  constructor(private productoService : ProductosService,
    private dialogo: MatDialog,
    private snackBar: MatSnackBar) { 
    this.bajar = this.productoService.active;
  }

  public ngOnInit(): void { 
    this.productoService.getListaProductos().subscribe(( jsonProductos : any ) => this.jsonProductos = jsonProductos);
    this.productoService.getProductosInactivos().subscribe(( jsonInactivos : any ) => this.jsonInactivos = jsonInactivos);
    this.columnsToDisplay = this.getColumns(); 
    setTimeout( () => { 
      this.dataSourceA.next(this.jsonProductos); 
      this.dataSourceI.next(this.jsonInactivos);  
    }, 200 );
  }

  public addColumn() { 
    if (this.columnsOculted.length) { 
      var arrayOculted = [];
      this.dialogo.open(DialogoColumnaComponent, {
        data: this.columnsOculted
        })
        .afterClosed().
        subscribe((lista: Ilista[]) => {
        if (lista) {
          var col = this.columnsToDisplay;
          col.pop();
          lista.forEach(element => { 
            if(element.current) col.splice(element.id, 0 , element.nombre);  
            else arrayOculted.push(element);
          });   
          this.columnsOculted = arrayOculted;   
          col.splice(col.length, 0 , 'eliminar'); 
          this.columnsToDisplay = col;
        }
      })
    } else{
      this.snackBar.open(this.productoService.mensajeColumnas, undefined, {
        duration: 1500,
      });
    }
  }

  public removeColumn(lista : Ilista) {  
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.splice(this.columnsToDisplay.indexOf(lista.nombre),1);
      lista.current = false;
      this.columnsOculted.push(lista);
    }  
  }

  public getColumns(){
    var aux = new Array;
    for (let i = 0; i < this.allColumns.length; i++) {
      aux.push(this.allColumns[i].nombre);
    }
    return aux;
  }

  public bajarProducto(event : any){
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
      this.dataSourceA.next(this.jsonProductos);
    }); 
  }

  public activarProducto(event : any){
    let producto = plainToClass(Producto, event);
    this.productoService.activarProducto(producto)
    .afterClosed().
      subscribe((confirmado: Boolean) => {
      if (!confirmado) return;
      this.productoService.activaProducto(producto).subscribe(() => { 
        this.snackBar.open(this.productoService.mensajeActivado, undefined, {
          duration: 1500,
        });
      });
      this.jsonInactivos.splice(this.jsonInactivos.indexOf(event),1); 
      this.dataSourceI.next(this.jsonInactivos);
    }); 
  }

}
