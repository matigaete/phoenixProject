import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { ServiciosService } from 'src/app/Servicios/servicios.service';
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
import { Servicio } from 'src/app/Clases/servicio';
import { FormControl } from '@angular/forms';
import { DialogoConfirmacionComponent } from 'src/app/Include/dialogo-confirmacion/dialogo-confirmacion.component';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public principalColumns = ['insert', 'add', 'item', 'name', 'cant'];
  public dispColumn = ['disp'];
  public dynamicColumns = ['cost', 'dcto', 'subtotal'];
  public displayedColumns = [];
  public factura = new Factura(0,
    new Persona(undefined, undefined, c_proveedor), undefined, undefined, 0, 0, 0, c_fctoventa);
  public transactions: DetalleFactura[] = [new DetalleFactura(0, 0, 0, c_producto, false, 0,
    new Producto(undefined, undefined, undefined, 0, 0, 0, 0, 0, false, ''),
    new Servicio(undefined, undefined, 0, ''))];
  public dataSource = new BehaviorSubject([]);
  public chkAll: boolean = false;
  public errorStock: boolean;
  public ultimaFactura: number;
  public producto$: Observable<Producto>;
  public servicio$: Observable<Servicio>;
  public persona$: Observable<Persona>;
  public clientes$: Observable<Persona[]>;
  public proveedores$: Observable<Persona[]>;
  public alertas: Ilista[];
  public fecha: string;
  public myControl = new FormControl();

  constructor(private businessService: BusinessService,
    private productosService: ProductosService,
    private serviciosService: ServiciosService,
    private personaService: PersonaService,
    private facturaService: FacturaService,
    private datepipe: DatePipe,
    private dialogo: MatDialog,
    private dateAdapter: DateAdapter<Date>) { }

  public ngOnInit() {
    this.dataSource.next(this.transactions);
    this.factura.detalle.push(this.transactions[0]);
    this.facturaService.getUltimaFactura().subscribe(nro => this.ultimaFactura = nro.cod);
    this.clientes$ = this.personaService.getClientesFiltro('%');
    this.proveedores$ = this.personaService.getProveedoresFiltro('%');
    this.displayedColumns = this.principalColumns.concat(this.dispColumn, this.dynamicColumns);
    this.dateAdapter.setLocale('en-GB');
  }

  public buscaCliente(codigo: string) {
    this.clientes$ = this.personaService.getClientesFiltro(codigo + '%');
  }

  public buscaProveedor(codigo: string) {
    this.proveedores$ = this.personaService.getProveedoresFiltro(codigo + '%');
  }

  // Se validan campos vacíos antes de generar factura
  public OnSubmit() {
    var errores = this.validaCampos();
    if (!errores.length) {
      this.getPersona();
      this.dialogo.open(DialogoConfirmacionComponent, {
        data: 'Desea generar la factura?'
      }).afterClosed()
        .subscribe((confirmado: boolean) => {
          if (confirmado) this.generaFactura();
        });
    } else {
      this.dialogo.open(DialogoErroresComponent, {
        data: errores
      });
      // var timeOut = 1500;
      // errores.forEach((message, index) => {
      //   setTimeout(() => {
      //     this.businessService.getAlert(message);
      //   }, index * (timeOut + 350)); // 500 => timeout between two messages
      // });
    }
  }

  public generaFactura() {
    var fact = this.factura;
    (fact.codFactura == undefined || fact.codFactura == 0) && fact.tipo == c_fctoventa
      ? fact.codFactura = ++this.ultimaFactura : 0;
    fact.hora = this.datepipe.transform(new Date(), 'HH:mm:ss');
    fact.fecha = this.datepipe.transform(new Date(this.fecha), 'yyyy-MM-dd');
    if (fact.generaFactura()) { // Si es verdadero es factura de compra
      this.facturaService.creaFacturaCompra(fact).subscribe(() => {
        this.businessService.getAlert('Insumos actualizados correctamente');
        this.reset();
      });
    } else {                    // Factura de venta
      this.facturaService.creaFacturaVenta(fact).subscribe(() => {
        this.businessService.getAlert('Factura creada correctamente');
        this.alertStock();
        this.generarPDF();
        // this.enviar(fact); // SE APLAZA ENVIO DE MAIL
        this.reset();
      });
    }
  }

  //Genera nueva posición
  public btnClick() {
    try {
      var newID = this.transactions[this.transactions.length - 1].posicion + 1;
    } catch (error) {
      newID = 0;
    }
    var registro: DetalleFactura = new DetalleFactura(newID, 0, 0, c_producto, false, 0,
      new Producto(undefined, undefined, undefined, 0, 0, 0, 0, 0, false, ''),
      new Servicio(undefined, undefined, 0, ''));
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
    this.transactions = [new DetalleFactura(0, 0, 0, c_producto, false, 0,
      new Producto(undefined, undefined, undefined, 0, 0, 0, 0, 0, false, ''))];;
    this.dataSource.next(this.transactions);
    this.factura.tipo == c_fctoventa ? this.ultimaFactura++ : 0;
    this.factura = new Factura(this.ultimaFactura,
      new Persona('', undefined, undefined, c_cliente), undefined, undefined, 0, 0, 0, c_fctoventa);
    this.factura.detalle.push(this.transactions[0]);
    this.fecha = null;
  }

  // Alerta todos los productos que se encuentren bajo el stock crítico
  public alertStock() {
    var arr = [];
    this.transactions.forEach(det => {
      if (det.tipo == c_producto) {
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
      }
    });
    this.alertas = Array.from(arr);
  }

  // Cierra las alertas de stock
  public close(alert: Ilista) {
    this.alertas.splice(this.alertas.indexOf(alert), 1);
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
            prd = new Producto(undefined, undefined, undefined, 0, 0, 0, 0, 0, false, prd.codigo)
          }
        }
        datpos.producto = prd;
      });
      modificado ? this.dataSource.next(this.transactions) : 0;
    }
  }

  //Busca un servicio a la BD para enlazarlo al detalle
  public findService(datpos: DetalleFactura) {
    var modificado: boolean;
    var srv = datpos.servicio;
    if (srv.codigo) {
      this.servicio$ = this.serviciosService.getServicio(srv.codigo);
      this.servicio$.forEach(servicio => {
        for (let i = 0; i < this.transactions.length; i++) {
          const element = this.transactions[i];
          if (element.posicion == datpos.posicion && servicio) {
            srv = servicio;
            modificado = true;
            break;
          } else {
            srv = new Servicio(undefined, undefined, 0, srv.codigo);
          }
        }
        datpos.servicio = srv;
      });
      modificado ? this.dataSource.next(this.transactions) : 0;
    }
  }

  // Validación si existe algún campo que falte por rellenar
  public validaCampos() {
    var log = [];
    var f = this.factura;
    var texto: string;
    f.tipo == c_cliente ? texto = 'Proveedor' : texto = 'Cliente';
    (f.codFactura == undefined || f.codFactura == 0) && f.tipo == c_fctocompra
      ? log.push('Ingrese código de factura') : 0;
    f.persona.rut == undefined || f.persona.rut == '' ? log.push(`Ingrese rut de ${texto}`) : 0;
    this.fecha == undefined ? log.push('Ingrese una fecha válida') : 0;
    f.tipo == undefined ? log.push('Ingrese tipo de factura') : 0;
    this.transactions.forEach(function (pos, index) {
      var msg = `Pos. ${index + 1} datos incompletos`;
      var error = false;
      if (pos.tipo == c_producto) {
        !pos.producto.nombre ? error = true : 0;
        !pos.producto.precioCompra ? error = true : 0;
        pos.cantidad > pos.producto.stock && f.tipo == c_fctoventa
          ? log.push(`No puede exceder al stock actual de posición ${index + 1}`) : 0;
      } else {
        !pos.servicio.nombre ? error = true : 0;
        !pos.servicio.precioVenta ? error = true : 0;
      }
      !pos.cantidad ? error = true : 0;
      error ? log.push(msg) : 0;
    });
    return log;
  }

  // Switch para cambio de producto a servicio (cantidad fijada en 1)
  public asignaCantidad(det: DetalleFactura) {
    det.cantidad = 0;
    det.tipo == c_servicio ? det.cantidad = 1 : 0;
  }

  // Al cambiar a factura de compra todas las posiciones se colocan de tipo P(producto)
  public cambiaCompra(fact: Factura) {
    if (fact.tipo == c_fctocompra) {
      fact.persona.tipo = c_proveedor;
      fact.detalle.forEach(det => {
        det.tipo = c_producto;
      })
      this.displayedColumns = this.principalColumns.concat(this.dynamicColumns);
    } else {
      fact.persona.tipo = c_cliente;
      fact.codFactura = this.ultimaFactura;
      this.displayedColumns = this.principalColumns.concat(this.dispColumn, this.dynamicColumns);
    }
  }
  // Obtiene el subtotal por posición
  public getSubtotal(f: Factura, d: DetalleFactura): number {
    return d.getSubtotal(f.tipo);
  }

  // Obtiene el monto neto de la factura
  public getNetAmount(f: Factura): number {
    return f.getNetAmount();
  }

  // Obtiene el IVA del monto neto
  public getIVA(f: Factura): number {
    return f.getIVA();
  }

  // Suma del neto + IVA
  public getTotalCost(f: Factura): number {
    return f.getTotalCost();
  }

  //Verifica si el rut ingresado existe
  public getPersona(): void {
    if (this.factura.tipo == c_fctoventa) {
      this.persona$ = this.personaService.getCliente(this.factura.persona.rut);
    } else {
      this.persona$ = this.personaService.getProveedor(this.factura.persona.rut);
    }
    this.persona$.forEach(per => {
      if (per) {
        this.factura.persona = per;
      }
    });
  }

  public enviar(f: Factura) {
    setTimeout(() => {
      let user = {
        name: f.persona.nombre,
        email: f.persona.email,
        factura: f.codFactura
      }
      this.facturaService.sendEmail("http://localhost:3000/sendmail", user).subscribe(
        data => {
          let res: any = data;
          console.log(
            `id mensaje: ${res.messageId}`
          );
        },
        err => {
          console.log(err);
        }, () => {
        }
      );
    }, 10000);
  }


  // Genera el PDF 
  public generarPDF() {
    this.businessService.generarPDF(this.factura, this.fecha);
  }
}

const c_producto = 'P';
const c_servicio = 'S';
const c_fctocompra = 'C';
const c_fctoventa = 'V';
const c_proveedor = 'P';
const c_cliente = 'C';