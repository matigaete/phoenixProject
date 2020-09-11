import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { FacturaService } from 'src/app/Servicios/factura.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from 'src/app/Clases/producto';
import { Factura } from 'src/app/Clases/factura';
import { DetalleFactura } from 'src/app/Clases/detalle-factura';
import { DatePipe } from '@angular/common';
import { Transaction } from 'src/app/Interfaces/transaction';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public displayedColumns = ['insert', 'item', 'name', 'cost', 'cant', 'subtotal'];
  public transactions: Transaction[] = [
    { idpos: 0, insert: false, idItem: '', name: '', cant: 0, cost: 0 },];
  public dataSource = new BehaviorSubject([]);
  public chkAll: boolean = false;
  public total: number = 0;
  public rdFactura: string;
  public producto$: Observable<Producto>;
  public fecha: string;
  public codProveedor: string;
  public codFactura: string;
  // public myFilter = (d: Date | null): boolean => {
  //   const day = (d || new Date()).getDay();
  //   // Prevent Saturday and Sunday from being selected.
  //   return day !== 0 && day !== 6;
  // }

  constructor(private productosService: ProductosService,
    private facturaService: FacturaService,
    private snackBar: MatSnackBar,
    private datepipe: DatePipe) { }

  public ngOnInit() {
    this.dataSource.next(this.transactions);
  }

  public OnSubmit() {
    if (this.rdFactura != undefined) {
      try {
        let hora = this.datepipe.transform(new Date(), 'HH:mm:ss');
        let fecha = this.datepipe.transform(new Date(this.fecha), 'yyyy-MM-dd');
        let factura = new Factura(this.codFactura, this.codProveedor, fecha, hora, this.total, this.rdFactura);
        let detalle: DetalleFactura[] = []; 
        for (let i = 0; i < this.transactions.length; i++) {
          const transac = this.transactions[i];
          detalle.push(new DetalleFactura(this.codFactura, i + 1, transac.cant, transac.cost, this.getSubtotal(transac), transac.idItem, this.codProveedor));
        }
        this.facturaService.creaFactura(factura).subscribe(() => {
          this.facturaService.creaDetalle(detalle).subscribe(() => {
            this.snackBar.open('Factura creada correctamente', undefined, {
              duration: 1500,
            });
            this.transactions = [];
            this.dataSource.next(this.transactions);
            this.codFactura = null;
            this.codProveedor = null;
            this.fecha = null;
          });
        });
      } catch (error) {
        this.snackBar.open('Ingrese una fecha válida', undefined, {
          duration: 1500,
        });
      }
    } else {
      this.snackBar.open('Ingrese tipo de factura', undefined, {
        duration: 1500,
      });
    }
  }

  public getTotalCost() {
    try {
      this.total = this.transactions.map(t => t.cost * t.cant).reduce((acc, value) => acc + value, 0);
    } catch (error) {
      this.total = 0;
    }
  }

  public btnClick() {
    try {
      var newID = this.transactions[this.transactions.length - 1].idpos + 1;
    } catch (error) {
      newID = 0;
    }
    var registro: Transaction = { idpos: newID, insert: false, idItem: '', cant: 0, cost: 0 };
    this.transactions.push(registro);
    this.dataSource.next(this.transactions);
  }

  public clear() {
    var array = [];
    this.transactions.forEach(transaction => {
      if (!transaction.insert) {
        array.push(transaction);
      }
    });
    this.transactions = array;
    this.dataSource.next(this.transactions);
    this.chkAll = false;
    this.snackBar.open('Posiciones seleccionadas eliminadas', undefined, {
      duration: 1500,
    });
  }

  public selectAll() {
    this.transactions.map(transac => transac.insert = this.chkAll);
    this.dataSource.next(this.transactions);
  }

  public find(datpos: Transaction) {
    var modificado: boolean;
    if (datpos.idItem) {
      this.producto$ = this.productosService.getProducto(datpos.idItem);
      this.producto$.forEach(producto => {
        for (let i = 0; i < this.transactions.length; i++) {
          const element = this.transactions[i];
          if (element.idpos == datpos.idpos && producto) {
            datpos.name = producto.nombre;
            datpos.disp = producto.stock;
            if (this.rdFactura == 'V') datpos.cost = producto.precioVenta;
            modificado = true;
            break;
          } else {
            datpos.name = '';
            if (this.rdFactura == 'V') datpos.cost = 0;
          }
        }
      });
      if (modificado) this.dataSource.next(this.transactions);
    }
  }

  public getSubtotal(t: Transaction): number {
    return t.cant * t.cost;
  }
}
