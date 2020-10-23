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
import jsPDF from 'jspdf';

const c_producto = 'P';
const c_servicio = 'S';
const c_fctocompra = 'C';
const c_fctoventa = 'V';
const c_proveedor = 'P';
const c_cliente = 'C';

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
  public factura = new Factura(undefined,
    new Persona(undefined, undefined, c_proveedor), undefined, undefined, 0, 0, 0, c_fctoventa);
  public transactions: DetalleFactura[] = [new DetalleFactura(0, 0, 0, c_producto, false, 0,
    new Producto(undefined, undefined, undefined, 0, 0, 0, 0, 0, false, ''),
    new Servicio(undefined, undefined, 0, ''))];
  public dataSource = new BehaviorSubject([]);
  public chkAll: boolean = false;
  public errorStock: boolean;
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
    console.log(this.factura);
    var errores = this.validaCampos();
    if (!errores.length) {
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
      //   }, index * (timeOut + 200)); // 500 => timeout between two messages
      // });
    }
  }

  public generaFactura() {
    var fact = this.factura;
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
    this.factura = new Factura(undefined,
      new Persona('', undefined, undefined, c_proveedor), undefined, undefined, 0, 0, 0, c_fctocompra);
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
      if (modificado) this.dataSource.next(this.transactions);
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
      if (modificado) this.dataSource.next(this.transactions);
    }
  }

  // Validación si existe algún campo que falte por rellenar
  public validaCampos() {
    var log = [];
    var f = this.factura;
    if (f.tipo == c_cliente) var texto = 'Proveedor'; else texto = 'Cliente';
    if (f.codFactura == undefined || f.codFactura == '') log.push('Ingrese código de factura');
    if (f.persona.rut == undefined || f.persona.rut == '') log.push(`Ingrese rut de ${texto}`);
    if (this.fecha == undefined) log.push('Ingrese una fecha válida');
    if (f.tipo == undefined) log.push('Ingrese tipo de factura');
    this.transactions.forEach(function (pos, index) {
      var msg = `Pos. ${index + 1} datos incompletos`;
      var error = false;
      if (pos.tipo == c_producto) {
        if (!pos.producto.nombre) { error = true }
        if (!pos.producto.precioCompra) { error = true }
        if (pos.cantidad > pos.producto.stock && f.tipo == c_fctoventa) log.push(`No puede exceder al stock actual de posición ${index + 1}`);
      } else {
        if (!pos.servicio.nombre) { error = true }
        if (!pos.servicio.precioVenta) { error = true }
      }
      if (!pos.cantidad) { error = true }
      if (error) { log.push(msg) }
    });
    return log;
  }

  // Switch para cambio de producto a servicio (cantidad fijada en 1)
  public asignaCantidad(det: DetalleFactura) {
    det.cantidad = 0;
    if (det.tipo == c_servicio) {
      det.cantidad = 1;
    }
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
      this.displayedColumns = this.principalColumns.concat(this.dispColumn, this.dynamicColumns);
    }
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

  public formControlStock() {
    return this.businessService.getFormControl(this.errorStock);
  }

  public generarPDF() {
    var doc = new jsPDF();

    var nombre = this.factura.total.toString();
    var direccion = this.factura.persona.direccion;
    var rfc = this.factura.persona.email;
    var totales = this.factura.total;
    var fecha = this.factura.fecha;

    //Seccion superior derecha
    //Palabra factura parte superior derecha
    doc.text('FACTURA', 170, 20);
    //Rectangulo folio fiscal
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(125, 30, 80, 10, 1, 1, 'F');
    doc.setFontSize(7);
    doc.text('Folio fiscal', 126, 33);
    doc.text('D6498A3E-4BCD-4AE0-B377-B49C831D4E7C', 126, 37,);
    //Rectangulo serie
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(125, 42, 20, 7, 1, 1, 'F');
    doc.setFontSize(7);
    doc.text('Serie', 126, 46,);
    doc.text('B', 136, 46,);
    //Rectangulo No.de factura
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(150, 42, 55, 7, 1, 1, 'F');
    doc.setFontSize(7);
    doc.text('No de factura', 151, 46);
    doc.text('98985', 171, 46);
    //Rectangulo lugar expedicion
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(125, 52, 80, 10, 1, 1, 'F');
    doc.setFontSize(7);
    doc.text('Expedida en', 126, 55);
    doc.text('Chihuahua,Chihuahua,MX', 126, 60);
    //Rectangulo no.certificado
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(125, 64, 80, 10, 1, 1, 'F');
    doc.setFontSize(7);
    doc.text('No. de certificado', 126, 67,);
    doc.text('00001000000201882158', 126, 71,);

    //Rectangulo fecha
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(125, 76, 80, 10, 1, 1, 'F');
    doc.text('Fecha y hora', 126, 79,);
    doc.setFontSize(7);
    // doc.fromHTML(fecha, 126, 80, { 'width': 80 });

    //Rectangulo pagos
    doc.setDrawColor('070');
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(125, 88, 80, 7, 1, 1, 'F');
    doc.text('Pago en una sola exhibicion', 126, 93,);
    //Rectangulo metodo de pago
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(125, 98, 38, 22, 1, 1, 'F');
    doc.text('Metodo de pago', 126, 101);
    doc.text('Efectivo', 126, 109);
    //Rectangulo cuenta
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(167, 98, 38, 22, 1, 1, 'F');
    doc.text('Cuenta', 168, 101);
    doc.text('NO APLICA', 168, 109);

    //Seccion superior izquierda

    doc.setFontSize(10);
    doc.text('Cyberpuerta S.A. de C.V.', 10, 50);
    doc.text('R.F.C. CYB080602JSA', 10, 55);
    doc.text('El Carmen 531 , Col. Camino Real, Zapopan Jalisco,México, C.P. 45040', 10, 60);
    doc.text('Régimen General de Ley Personas Morales', 10, 65);
    doc.setFontSize(7);
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(10, 73, 70, 22, 1, 1, 'F');
    doc.text('Nombre del cliente', 11, 76);
    doc.text(nombre, 11, 79); 

    //RFC
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(85, 73, 35, 22, 1, 1, 'F');
    doc.text('RFC', 86, 76);
    // doc.fromHTML(rfc, 87, 79, { 'width': 65 });
    //Domicilio
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(10, 98, 109, 22, 1, 1, 'F');
    doc.text('Domicilio', 11, 101);
    // doc.fromHTML(direccion, 11, 104, { 'width': 65 });

    //Detalle de productos
    doc.setLineWidth(0.25);
    doc.line(10, 125, 205, 125);
    doc.text('Cant.', 10, 130);
    doc.text('Descripcion', 23, 130);
    doc.text('P.Unitario', 157, 130);
    doc.text('Importe', 185, 130);
    doc.setLineWidth(0.25);
    doc.line(10, 133, 205, 133);

    //Lista de productos
    doc.setFontSize(7);

    for (let i = 0; i < this.factura.detalle.length; i++) {
      const pos = this.factura.detalle[i];
      // doc.cell(10, 133, 10, 7, pos.cantidad.toString(), 1, i);
      // doc.cell(22, 133, 135, 7, pos.producto.nombre, 2, '');
      // doc.cell(115, 133, 25, 7, pos.producto.precioVenta.toString(), 3, '');
    }

    //Cantidades de factura
    doc.setFontSize(8);
    doc.setLineWidth(0.25);
    doc.line(10, 190, 205, 190);
    //doc.text(10,195,'Cantidad con letra');  


    // doc.fromHTML(totales.toString(), 160, 195, { 'width': 60 });



    doc.setLineWidth(0.25);
    doc.line(10, 215, 205, 215);

    //Sellos digitales y qr

    doc.setFontSize(7);
    //Sello digital
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(60, 220, 145, 19, 1, 1, 'F');
    doc.text('Sello digital', 61, 223);
    doc.text('MYosIfg2eMviGCRPbIP4tXwXjP+ubkn+QYy9Dvsq2wX4nwKx3dC9/Eyy874xjsvW8obrrM', 61, 227);
    doc.text('M2nhvtkeutGnx5DcYXRylJ8redA3/WPkNPZg3cVwktLihzbHd+VDD2L5NNezvfsg03Bqy8', 61, 231);
    doc.text('8P8a5Ag4k4kWYBZnrvkrm/XGsJIQy9dBc=', 61, 235);
    //Sello del SAT
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(60, 241, 145, 19, 1, 1, 'F');
    doc.text('Sello del SAT', 61, 244);
    doc.text('B1jM64aAjZOb7/k3u0a+08/wHrmjlATgGEnDlTUL4kILwLlOrO1aZnlfSE2RWVqWrSj333', 61, 249);
    doc.text('3n587yizKgyKLYzgchn+zM3LoGJrB47ufYoJQrjKZpwp8SRqX0kHRA6YUDopiZpZAw+OQs', 61, 253);
    doc.text('FaxT4DSZ4BzFW530t55aVUjSCWCiVUGs=', 61, 257);
    //Cadena orignal del complemento de certificacion digital del SAT
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(10, 263, 195, 15, 1, 1, 'F');
    doc.text('Cadena original del complemento de certificacion digital del SAT', 11, 266);
    doc.text('||1.0|87c43498-33fe-420f-9ec0-a4a331ea76e1|2015-01-01T10:34:08|MYosIfg2eMviGCRPbIP4tXwXjP+ubkn+QYy9Dvsq2wX4nwKx3dC9/Eyy874xjsvW8obrrM2nhvtkeut', 11, 270);
    doc.text('Gnx5DcYXRylJ8redA3/WPkNPZg3cVwktLihzbHd+VDD2L5NNezvfsg03Bqy8P8a5Ag4k4kWYBZnrvkrm/XGsJIQy9dBc=|00001000000203430011||', 11, 275);
    //No. de Serie del Certificado del SAT
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(10, 280, 96, 9, 1, 1, 'F');
    doc.text('No. de Serie del Certificado del SAT', 11, 283);
    doc.text('00001000000300209963', 11, 287);
    //Fecha y hora de certificación
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.roundedRect(109, 280, 96, 9, 1, 1, 'F');
    doc.text('Fecha y hora de certificación', 110, 283);
    doc.setFontSize(6);
    // doc.fromHTML(fecha, 110, 282, { 'width': 80 });

    // doc.addImage(imgData, 'JPEG', 10, 217, 45, 45);

    doc.save('test.pdf');
    doc.output('dataurlnewwindow');
  }

}
