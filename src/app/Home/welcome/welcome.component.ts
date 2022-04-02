import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { ServiciosService } from 'src/app/Servicios/servicios.service';
import { FacturaService } from 'src/app/Servicios/factura.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto } from 'src/app/Interfaces/producto';
import { Factura } from 'src/app/Interfaces/factura';
import { DetalleFactura } from 'src/app/Interfaces/detalle-factura';
import { DatePipe } from '@angular/common';
import { BusinessService } from 'src/app/Servicios/business.service';
import { PersonaService } from 'src/app/Servicios/persona.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoErroresComponent } from 'src/app/Include/dialogo-errores/dialogo-errores.component';
import { Persona } from 'src/app/Interfaces/persona';
import { Ilista } from 'src/app/Interfaces/ilista';
import { Servicio } from 'src/app/Interfaces/servicio';
import { FacturaHelper } from 'src/app/Helpers/factura-helper';
import { DetalleFacturaHelper } from 'src/app/Helpers/detalle-factura-helper';
import { TipoFactura } from 'src/app/Utils/factura.constants';
import { TipoProducto } from 'src/app/Utils/producto.constants';
import { TipoPersona } from 'src/app/Utils/persona.constants';
import { FormControl } from '@angular/forms';
import { DialogoConfirmacionComponent } from 'src/app/Include/dialogo-confirmacion/dialogo-confirmacion.component';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  principalColumns = ['insert', 'add', 'item', 'name', 'cant'];
  dispColumn = ['disp'];
  dynamicColumns = ['cost', 'dcto', 'subtotal'];
  displayedColumns = [];
  factura: Factura = { persona: { rut: '' }, tipo: TipoFactura.FacturaVenta, detalle: [{}] };
  transactions: DetalleFactura[] = [
    { dcto: 0, tipo: TipoProducto.Insumo, producto: { stock: 0 } }
  ];
  dataSource = new BehaviorSubject([]);
  chkAll: boolean = false;
  errorStock: boolean;
  ultimaFactura: number;
  ultimaCotizacion: number;
  producto$: Observable<Producto>;
  servicio$: Observable<Servicio>;
  persona$: Observable<Persona>;
  clientes$: Observable<Persona[]>;
  proveedores$: Observable<Persona[]>;
  alertas: Ilista[];
  fecha: string;
  esCotizacion: boolean = false;
  esFacturaCompra: boolean = false;
  myControl = new FormControl();

  constructor(private businessService: BusinessService,
    private productosService: ProductosService,
    private serviciosService: ServiciosService,
    private personaService: PersonaService,
    private facturaService: FacturaService,
    private datepipe: DatePipe,
    private dialogo: MatDialog,
    private dateAdapter: DateAdapter<Date>) { }

  ngOnInit() {
    this.dataSource.next(this.transactions);
    this.factura.detalle.push(this.transactions[0]);
    //this.facturaService.getUltimaFactura().subscribe(nro => this.ultimaFactura = nro.cod);
    //this.facturaService.getUltimaCotizacion().subscribe(nro => this.ultimaCotizacion = nro.cod);
    this.clientes$ = this.personaService.getClientesFiltro('%');
    this.proveedores$ = this.personaService.getProveedoresFiltro('%');
    this.displayedColumns = this.principalColumns.concat(this.dispColumn, this.dynamicColumns);
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnChanges() {
    let tipo = this.factura.tipo;
    this.esCotizacion = tipo == TipoFactura.CotizacionInsumos || tipo == TipoFactura.CotizacionServicios;
    this.esFacturaCompra = tipo == TipoFactura.FacturaCompra;
  }

  buscaCliente(codigo: string) {
    this.clientes$ = this.personaService.getClientesFiltro(codigo + '%');
  }

  buscaProveedor(codigo: string) {
    this.proveedores$ = this.personaService.getProveedoresFiltro(codigo + '%');
  }

  // Se validan campos vacíos antes de generar factura
  OnSubmit() {
    let errores = this.validaCampos();
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
      // let timeOut = 1500;
      // errores.forEach((message, index) => {
      //   setTimeout(() => {
      //     this.businessService.getAlert(message);
      //   }, index * (timeOut + 350)); // 500 => timeout between two messages
      // });
    }
  }

  generaFactura() {
    let fact = this.factura;
    (fact.codFactura == undefined || fact.codFactura == 0) && fact.tipo == TipoFactura.FacturaVenta
      ? fact.codFactura = ++this.ultimaFactura : 0;
    fact.hora = this.datepipe.transform(new Date(), 'HH:mm:ss');
    fact.fecha = this.datepipe.transform(new Date(this.fecha), 'yyyy-MM-dd');
    fact = FacturaHelper.limpiaPosiciones(fact);
    if (fact.tipo == TipoFactura.FacturaCompra) { // Si es verdadero es factura de compra
      this.facturaService.creaFacturaCompra(fact).subscribe(() => {
        this.businessService.getAlert('Insumos actualizados correctamente');
        this.reset();
      });
    } else if (fact.tipo == TipoFactura.FacturaVenta) {                    // Factura de venta
      this.facturaService.creaFacturaVenta(fact).subscribe(() => {
        this.businessService.getAlert('Factura creada correctamente');
        this.alertStock();
        this.generarCotizacion();
        this.reset();
        // this.enviar(fact); // SE APLAZA ENVIO DE MAIL
      });
    } else {                    // Factura de venta
      this.facturaService.creaCotizacion(fact).subscribe(() => {
        this.businessService.getAlert('Cotización creada correctamente'); 
        this.generarCotizacion(); 
        this.reset();
      });
    }
  }

  //Genera nueva posición
  btnClick() {
    let newID = 0;
    try {
      newID = this.transactions[this.transactions.length - 1].posicion + 1;
    } catch (error) {
      newID = 0;
    }
    let registro: DetalleFactura = { posicion: newID, tipo: TipoProducto.Insumo };
    this.transactions.push(registro);
    this.factura.detalle = this.transactions;
    this.dataSource.next(this.transactions);
  }

  // Limpia posiciones según las que estén marcadas
  clear() {
    let array = [];
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
  reset() {
    this.transactions = [{tipo: TipoProducto.Insumo}];
    this.dataSource.next(this.transactions);
    this.factura.tipo == TipoFactura.FacturaVenta ? this.ultimaFactura++ : 0;
    this.factura = {
      tipo: TipoFactura.FacturaVenta,
      persona: {
        tipo: TipoPersona.Cliente
      }
    }
    this.factura.detalle.push(this.transactions[0]);
    this.fecha = null;
  }

  // Alerta todos los productos que se encuentren bajo el stock crítico
  alertStock() {
    let arr = [];
    this.transactions.forEach(det => {
      if (det.tipo == TipoProducto.Insumo) {
        let producto = det.producto;
        let cantidadFinal = producto.stock - det.cantidad;
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
  close(alert: Ilista) {
    this.alertas.splice(this.alertas.indexOf(alert), 1);
  }

  // Selecciona todas las posiciones
  selectAll() {
    this.transactions.map(transac => transac.insert = this.chkAll);
    this.dataSource.next(this.transactions);
  }

  //Busca un producto a la BD para enlazarlo al detalle
  findProduct(datpos: DetalleFactura) {
    let modificado: boolean;
    let prd = datpos.producto;
    if (prd.codigo) {
      this.producto$ = this.productosService.getProducto(prd.codigo);
      this.producto$.subscribe(producto => {
        for (let i = 0; i < this.transactions.length; i++) {
          const element = this.transactions[i];
          if (element.posicion == datpos.posicion && producto) {
            prd = producto;
            modificado = true;
            break;
          } else {
            prd = {
              codigo: prd.codigo
            }
          }
        }
        datpos.producto = prd;
      });
      modificado ? this.dataSource.next(this.transactions) : 0;
    }
  }

  //Busca un servicio a la BD para enlazarlo al detalle
  findService(datpos: DetalleFactura) {
    let modificado: boolean;
    let srv = datpos.servicio;
    if (srv.codigo) {
      this.servicio$ = this.serviciosService.getServicio(srv.codigo);
      this.servicio$.subscribe(servicio => {
        for (let i = 0; i < this.transactions.length; i++) {
          const element = this.transactions[i];
          if (element.posicion == datpos.posicion && servicio) {
            srv = servicio;
            modificado = true;
            break;
          } else {
            srv = {
              codigo: srv.codigo
            }
          }
        }
        datpos.servicio = srv;
      });
      modificado ? this.dataSource.next(this.transactions) : 0;
    }
  }

  // Validación si existe algún campo que falte por rellenar
  validaCampos() {
    let log = [];
    let f = this.factura;
    let texto = f.tipo == TipoPersona.Cliente ? 'Proveedor' : 'Cliente';
    if (f.codFactura == undefined || f.codFactura == 0 && f.tipo == TipoFactura.FacturaCompra ) {
      log.push('Ingrese código de factura')
    }
    if (f.persona.rut == undefined || f.persona.rut == '') {
      log.push(`Ingrese rut de ${texto}`)
    }
    if (this.fecha == undefined) {
      log.push('Ingrese una fecha válida')
    }
    if (f.tipo == undefined) {
      log.push('Ingrese tipo de factura')
    }
    this.transactions.forEach(function (pos, index) {
      let msg = `Pos. ${index + 1} datos incompletos`;
      let error = false;
      if (pos.tipo == TipoProducto.Insumo) {
        !pos.producto.nombre ? error = true : 0;
        !pos.producto.precioCompra ? error = true : 0;
        pos.cantidad > pos.producto.stock && f.tipo == TipoFactura.FacturaVenta
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
  asignaCantidad(det: DetalleFactura) {
    det.cantidad = 0;
    det.tipo == TipoProducto.Servicio ? det.cantidad = 1 : 0;
  }

  // Al cambiar a factura de compra todas las posiciones se colocan de tipo P(producto)
  cambiaCompra(fact: Factura) {
    if (fact.tipo == TipoFactura.FacturaCompra) {
      fact.persona.tipo = TipoPersona.Proveedor;
      fact.detalle.forEach(det => {
        det.tipo = TipoProducto.Insumo;
      })
      this.displayedColumns = this.principalColumns.concat(this.dynamicColumns);
    } else {
      fact.persona.tipo = TipoPersona.Cliente;
      fact.codFactura = this.ultimaFactura;
      this.displayedColumns = this.principalColumns.concat(this.dispColumn, this.dynamicColumns);
    }
  }
  // Obtiene el subtotal por posición
  getSubtotal(f: Factura, d: DetalleFactura): number {
    return DetalleFacturaHelper.getSubtotal(d, f.tipo);
  }

  // Obtiene el monto neto de la factura
  getNetAmount(f: Factura): number {
    return FacturaHelper.getNetAmount(f);
  }

  // Obtiene el IVA del monto neto
  getIVA(f: Factura): number {
    return FacturaHelper.getIVA(f);
  }

  // Suma del neto + IVA
  getTotalCost(f: Factura): number {
    return FacturaHelper.getTotalCost(f);
  }

  //Verifica si el rut ingresado existe
  getPersona(): void {
    if (this.factura.tipo == TipoFactura.FacturaVenta) {
      this.persona$ = this.personaService.getCliente(this.factura.persona.rut);
    } else {
      this.persona$ = this.personaService.getProveedor(this.factura.persona.rut);
    }
    this.persona$.subscribe(per => {
      if (per) {
        this.factura.persona = per;
      }
    });
  }

  enviar(f: Factura) {
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


  // Genera el PDF de cotización
  generarCotizacion() {
    this.businessService.generarCotizacion(this.factura, this.fecha);
  }

  // Genera el PDF de factura venta
  generarFactura() {
    this.businessService.generarFactura(this.factura, this.fecha);
  }
}