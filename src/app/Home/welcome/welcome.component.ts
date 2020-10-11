import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { FacturaService } from 'src/app/Servicios/factura.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from 'src/app/Clases/producto';
import { Factura } from 'src/app/Clases/factura';
import { DetalleFactura } from 'src/app/Clases/detalle-factura';
import { DatePipe } from '@angular/common';
import { BusinessService } from 'src/app/Servicios/business.service';
import { PersonaService } from 'src/app/Servicios/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoErroresComponent } from 'src/app/Include/dialogo-errores/dialogo-errores.component';
import { Persona } from 'src/app/Clases/persona';
import { Ilista } from 'src/app/Interfaces/ilista';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public displayedColumns = ['insert', 'add', 'item', 'name', 'cant', 'cost', 'dcto', 'subtotal'];
  public factura = new Factura(undefined, 
    new Persona(undefined, undefined, undefined, 'P'), undefined, undefined, 0, 0, 0, 'C');
  public transactions: DetalleFactura[] = [new DetalleFactura(0, 0, 0, false, undefined, undefined, 0, 
    new Producto(undefined, undefined, undefined, 0, 0, 0, 0, false, ''))];
  public dataSource = new BehaviorSubject([]);
  public chkAll: boolean = false; 
  public producto$: Observable<Producto>;
  public persona$: Observable<Persona>;
  public alertas: Ilista[];
  public fecha: string; 

  constructor(private businessService: BusinessService,
    private productosService: ProductosService,
    private personaService: PersonaService,
    private facturaService: FacturaService,
    private datepipe: DatePipe,
    private dialogo: MatDialog) { }

  public ngOnInit() {
    this.dataSource.next(this.transactions);
    this.factura.detalle.push(this.transactions[0]);
  }

  // Se validan campos vacíos antes de generar factura
  public OnSubmit() {
    var fact = this.factura;
    var errores = this.validaCampos();
    if (!errores.length) {
      fact.hora = this.datepipe.transform(new Date(), 'HH:mm:ss');
      fact.fecha = this.datepipe.transform(new Date(this.fecha), 'yyyy-MM-dd');
      fact.detalle.forEach(det => {
        det.codFactura = fact.codFactura;
        det.codPersona = fact.persona.rut;
      });
      if (fact.tipo == 'C') { 
        this.facturaService.creaFacturaCompra(fact).subscribe(() => {
          this.businessService.getAlert('Factura creada correctamente');
          this.reset();
        });
      } else {
        this.alertStock();
        this.facturaService.creaFacturaVenta(fact).subscribe(() => {
          this.businessService.getAlert('Factura creada correctamente');
          this.alertStock();
          this.reset();
        });
      }
    } else {
      this.dialogo.open(DialogoErroresComponent, {
        data: errores
      });
      // var timeOut = 1500;
      // errores.forEach((message, index) => {
      //   setTimeout(() => {
      //     this.businessService.getAlert(message);
      //   }, index * (timeOut + 200)); // 500 => timeout between two messages
      // });
    }
  }


  //Genera nueva posición
  public btnClick() {
    var fact = this.factura;
    try {
      var newID = this.transactions[this.transactions.length - 1].posicion + 1;
    } catch (error) {
      newID = 0;
    }
    var registro: DetalleFactura = new DetalleFactura(newID, 0, 0, false, fact.codFactura, fact.persona.rut, 0, 
      new Producto(undefined, undefined, undefined, 0, 0, 0, 0, false, ''));
    this.transactions.push(registro);
    this.factura.detalle = this.transactions;
    this.dataSource.next(this.transactions);
  }

  // Limpia posiciones según las que estén marcadas
  public clear() {
    var array = [];
    this.transactions.forEach(transaction => {
      if (!transaction.insert) {
        array.push(transaction);
      }
    });
    if (array.length < this.transactions.length) {
      this.transactions = array;
      this.dataSource.next(this.transactions);
      this.factura.detalle = this.transactions;
      this.chkAll = false;
      this.businessService.getAlert('Posiciones seleccionadas eliminadas');
    } else {
      this.businessService.getAlert('No se eliminaron posiciones');
    }
  }

  // Se ejecuta al generarse la factura, limpia todos los campos
  public reset() {
    this.transactions = [new DetalleFactura(0, 0, 0, false, undefined, undefined, 0, 
      new Producto(undefined, undefined, undefined, 0, 0, 0, 0, false, ''))];;
    this.dataSource.next(this.transactions);
    this.factura = new Factura(undefined, undefined, undefined, undefined, 0, 0, 0, 'C');
    this.fecha = null;
  }

  // Alerta todos los productos que se encuentren bajo el stock crítico
  public alertStock(){ 
    var arr = [];
    this.transactions.forEach(det => {
      var producto = det.producto;
      var cantidadFinal = producto.stock - det.cantidad; 
      if (cantidadFinal <= 0) {
        arr.push({
          tipo: 'danger',
          nombre: `${producto.nombre} (${producto.codigo}) se encuentra sin stock`,
        });
      } else if (cantidadFinal < det.producto.stockCritico) {
        arr.push({
          tipo: 'warning',
          nombre: `${producto.nombre} (${producto.codigo}) bajo de stock crítico`, 
        });
      }
    });
    this.alertas = Array.from(arr);
  }

  // Selecciona todas las posiciones
  public selectAll() {
    this.transactions.map(transac => transac.insert = this.chkAll);
    this.dataSource.next(this.transactions);
  }


  //Busca un producto a la BD para enlazarlo al detalle
  public findProduct(datpos: DetalleFactura) {
    var modificado: boolean;
    var prd = datpos.producto;
    if (prd.codigo) {
      this.producto$ = this.productosService.getProducto(prd.codigo);
      this.producto$.forEach(producto => {
        for (let i = 0; i < this.transactions.length; i++) {
          const element = this.transactions[i];
          if (element.posicion == datpos.posicion && producto) {
            prd = producto;
            modificado = true;
            break;
          } else {
            prd = new Producto(undefined, undefined, undefined, 0, 0, 0, 0, false, prd.codigo)
          }
        }
        datpos.producto = prd;
      });
      if (modificado) this.dataSource.next(this.transactions);
    }
  }

  //Busca un proveedor/cliente a la BD para enlazarlo a la factura
  public findPerson(fact : Factura) {
    var modificado: boolean;
    var per = fact.persona;
    if (per.rut) {
      this.persona$ = this.personaService.getPersona(per);
      this.persona$.forEach(persona => { per = persona });
      if (modificado) this.dataSource.next(this.transactions);
    }
  }

  // Validación si existe algún campo que falte por rellenar
  public validaCampos() {
    var log = [];
    var f = this.factura;
    if (f.tipo == 'C') var texto = 'Proveedor'; else texto = 'Cliente';
    if (f.codFactura == undefined || f.codFactura == '') log.push('Ingrese código de factura');
    if (f.persona.rut == undefined || f.persona.rut == '') log.push(`Ingrese rut de ${texto}`);
    if (this.fecha == undefined) log.push('Ingrese una fecha válida');
    if (f.tipo == undefined) log.push('Ingrese tipo de factura');
    this.transactions.forEach(function (pos, index) {
      var msg = `Pos. ${index + 1} datos incompletos`;
      var error = false;
      if (!pos.producto.nombre) { error = true }
      if (!pos.cantidad) { error = true }
      if (!pos.producto.precioCompra) { error = true }
      if (error) { log.push(msg) }
    });
    return log;
  }

  public getTipoPersona() {
    var valor: string;
    if (this.factura.tipo == 'V') {
      valor = 'Cliente';
    } else {
      valor = 'Proveedor';
    }
    return valor;
  }
  
  public close(alert: Ilista) {
    this.alertas.splice(this.alertas.indexOf(alert), 1);
  }

  public getSubtotal(f: Factura, d: DetalleFactura): number {
    return d.getSubtotal(f.tipo);
  }

  public getNetAmount(f: Factura): number { 
    return f.getNetAmount();
  }

  public getIVA(f: Factura): number { 
    return f.getIVA();
  }

  public getTotalCost(f: Factura): number {
    return f.getTotalCost();
  }
}
