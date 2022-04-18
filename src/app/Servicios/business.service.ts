import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ilista } from '../Interfaces/ilista';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import jsPDF from 'jspdf';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RutPipe } from '../Pipes/rut.pipe';
import { Factura } from '../Interfaces/factura';
import { TipoProducto } from '../Utils/producto.constants';
import { TipoFactura } from '../Utils/factura.constants';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  public url = environment.baseUrl;
  private _active: string;
  private _action: string;
  private _option: number;
  private _disabled: string;
  private _error: boolean;

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private currencypipe: CurrencyPipe,
    private rutPipe: RutPipe,
    private datepipe: DatePipe) {

    this._error = true;
  }

  //-Listas desplegables--------------------------//
  public getMantenedores(): Ilista[] {
    return [{
      id: 1,
      nombre: 'Productos',
      path: 'productos',
    }, {
      id: 2,
      nombre: 'Categorías',
      path: 'categorias',
    }, {
      id: 3,
      nombre: 'Servicios',
      path: 'servicios',
    }, {
      id: 4,
      nombre: 'Personas',
      path: 'personas',
      // }, {
      //   id: 3,
      //   nombre: 'Clientes',
      //   path: 'clientes',
      // }, {
      //   id: 4,
      //   nombre: 'Proveedores',
      //   path: 'proveedores',
    }];
  }

  public getAcciones(): Ilista[] {
    return [{
      id: 1,
      nombre: 'Agregar',
      current: true,
    }, {
      id: 2,
      nombre: 'Modificar',
      current: false,
    }, {
      id: 3,
      nombre: 'Consultar',
      current: false,
    }, {
      id: 4,
      nombre: 'Listado',
      current: false,
    }
    ];
  }

  public getFormControl(error: boolean) {
    return {
      'form-control': true,
      'is-invalid': error,
      'is-valid': !error
    };
  }

  public validaCampo(campo: string, error: boolean) {
    if (campo == '' || campo == null) {
      error = true;
    } else {
      error = false;
    }
    return error;
  }

  //-End listas----------------------------------//

  //-Funciones-----------------------------------//
  public redirect(path: string): void {
    this.router.navigate([path]);
  }

  public asignarOpcion(option: number, acciones: Ilista[]): Ilista[] {
    this.option = option;
    this.clearCurrent(acciones);
    acciones[option - 1].current = this.active;
    return acciones;
  }

  public clearCurrent(acciones: Ilista[]): void {
    for (let i = 0; i < acciones.length; i++) {
      acciones[i].current = false;
    }
  }

  public getAlert(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 1500,
    });
  }


  public convierteCLP(valor: number): string {
    return this.currencypipe.transform(valor, 'CLP', 'symbol-narrow').toString();
  }

  // Genera el PDF de factura
  public generarCotizacion(f: Factura, fecha?: string) {
    const doc = new jsPDF();
    const img = new Image();
    const rut = this.rutPipe.transform(f.persona.rut);
    const nombre = f.persona.nombre; 
    const direccion = f.persona.direccion; 
    const contacto = f.persona.contacto;
    const email = f.persona.email;
    const neto = this.convierteCLP(f.neto);
    const iva = this.convierteCLP(f.iva);
    const total = this.convierteCLP(f.total);
    const nroFactura = f.codFactura;
    fecha = this.datepipe.transform(new Date(fecha), 'dd-MM-yyyy');

    doc.setFontSize(15);
    doc.setFont('Helvetica', 'bold'); //negrita
    doc.text('COTIZACIÓN', 90, 30);

    //Seccion superior izquierda
    img.src = 'assets/Serviciotecnico-1.jpg';
    doc.addImage(img, 'JPEG', 10, 10, 40, 40);

    //Datos del cliente
    doc.rect(10, 43, 80, 31, 'S');
    doc.setFontSize(7);
    doc.text('Cliente:', 11, 57);
    doc.text(nombre, 30, 47);
    doc.line(10, 49, 90, 49);
    // Rut
    doc.text('Rut:', 11, 52);
    doc.text(rut, 30, 52);
    doc.line(10, 54, 90, 54);
    // Representante
    doc.text('Contacto:', 11, 57);
    // doc.text(giro, 30, 57);
    doc.line(10, 59, 90, 59);
    // Telefono
    doc.text('Telefono:', 11, 62);
    doc.text(contacto, 30, 62);
    doc.line(10, 64, 90, 64);
    // Dirección
    doc.text('Dirección:', 11, 67);
    doc.text(direccion, 30, 67);
    doc.line(10, 69, 90, 69);
    // Email
    doc.text('Email:', 11, 72);
    doc.text(email, 30, 72);
    doc.line(27, 43, 27, 74);

    //Seccion superior derecha 
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.rect(160, 17, 40, 15, 'S');
    doc.setFontSize(7);
    doc.setFont('Helvetica', 'normal');
    doc.line(180, 17, 180, 32);
    doc.text('Fecha:', 162, 20);
    doc.text(fecha, 185, 20);
    doc.line(160, 22, 200, 22);
    doc.text('Cotización N°', 162, 25);
    doc.text('1', 190, 25);
    doc.line(160, 27, 200, 27);
    doc.text('Registro N°', 162, 30);
    doc.text('1', 190, 30);

    //Datos de la empresa
    doc.setFontSize(7);
    doc.setFont('Helvetica', 'bold'); //negrita
    doc.rect(150, 43, 55, 31, 'S');
    doc.line(150, 49, 205, 49);
    doc.text('TECHNICAL SERVICE M & G SPA', 151, 47);
    doc.line(150, 54, 205, 54);
    doc.text('77.132.092-9', 151, 52);
    doc.line(150, 59, 205, 59);
    doc.text('Los pistachos 2155. San Bernardo', 151, 57);
    doc.line(150, 64, 205, 64);
    doc.text('(56) 9 4714 9483', 151, 62);
    doc.line(150, 69, 205, 69);
    doc.text('Marcelo Gaete ', 151, 67);
    doc.line(27, 43, 27, 74);
    doc.text('mgaete@technicalservice.cl', 151, 72);

    if (f.tipo == TipoFactura.CotizacionInsumos) {
      //Detalle de cotización
      doc.setLineWidth(0.25);
      doc.setFontSize(10);
      doc.line(10, 95, 355, 95);
      doc.line(10, 95, 10, 105);
      doc.text('Código', 11, 100);
      doc.line(35, 95, 35, 105);
      doc.text('Descripción', 55, 100);
      doc.line(100, 95, 100, 105);
      doc.text('Cantidad', 105, 100);
      doc.line(125, 95, 125, 105);
      doc.text('Precio unitario', 130, 100);
      doc.line(165, 95, 165, 105);
      doc.text('Precio final', 180, 100);
      doc.line(10, 95, 10, 105);
      doc.setLineWidth(0.25);
      doc.line(10, 105, 355, 105);

      //Lista de productos
      doc.setFontSize(7);
      doc.setFont('Helvetica', 'normal');
      let cord = 110;
      f.detalle.forEach(pos => {
        doc.text(pos.producto.id.toString(), 15, cord);      //Código
        doc.text(pos.producto.descripcion, 40, cord);  //Descripción
        doc.text(this.convierteCLP(pos.producto.precioVenta), 143, cord);      //Precio 
        doc.text(pos.cantidad.toString(), 113, cord);    //Cantidad 
        doc.text(this.convierteCLP(pos.subtotal), 185, cord);       //Subtotal
        cord = cord + 5;
      });
    } else {
      //Detalle de servicio
      doc.setLineWidth(0.25);
      doc.setFontSize(10);
      doc.line(10, 95, 355, 95);
      doc.line(10, 95, 10, 105);
      doc.text('Código', 11, 100);
      doc.line(35, 95, 35, 105);
      doc.text('Descripción Servicio', 40, 100);
      doc.line(100, 95, 100, 105);
      doc.text('Cantidad', 105, 100);
      doc.line(125, 95, 125, 105);
      doc.text('Precio unitario', 130, 100);
      doc.line(165, 95, 165, 105);
      doc.text('Precio final', 180, 100);
      doc.line(10, 95, 10, 105);
      doc.setLineWidth(0.25);
      doc.line(10, 105, 355, 105);

      //Lista de productos
      doc.setFontSize(7);
      doc.setFont('Helvetica', 'normal');
      let cord = 110;
      f.detalle.forEach(pos => {
        if (pos.tipo == TipoProducto.Servicio) {
          doc.text(pos.servicio.id.toString(), 15, cord);      //Código
          doc.text(pos.servicio.descripcion, 40, cord);  //Descripción
          doc.text(this.convierteCLP(pos.servicio.precioVenta), 143, cord);      //Precio 
          doc.text(pos.cantidad.toString(), 113, cord);    //Cantidad 
          doc.text(this.convierteCLP(pos.subtotal), 185, cord);       //Subtotal
          cord = cord + 5;
        }
      });

      //Detalle de repuestos
      doc.setFont('Helvetica', 'bold'); //negrita
      doc.setLineWidth(0.25);
      doc.setFontSize(10);
      doc.line(10, 155, 355, 155);
      doc.line(10, 155, 10, 165);
      doc.text('Código', 11, 160);
      doc.line(35, 155, 35, 165);
      doc.text('Descripción Respuestos', 40, 160);
      doc.line(100, 155, 100, 165);
      doc.text('Cantidad', 105, 160);
      doc.line(125, 155, 125, 165);
      doc.text('Precio unitario', 130, 160);
      doc.line(165, 155, 165, 165);
      doc.text('Precio final', 180, 160);
      doc.line(10, 155, 10, 165);
      doc.setLineWidth(0.25);
      doc.line(10, 165, 355, 165);

      //Lista de productos
      doc.setFontSize(7);
      doc.setFont('Helvetica', 'normal');
      cord = 170;
      f.detalle.forEach(pos => {
        if (pos.tipo == TipoProducto.Insumo) {
          doc.text(pos.producto.id.toString(), 15, cord);      //Código
          doc.text(pos.producto.descripcion, 40, cord);  //Descripción
          doc.text(this.convierteCLP(pos.producto.precioVenta), 143, cord);      //Precio 
          doc.text(pos.cantidad.toString(), 113, cord);    //Cantidad 
          doc.text(this.convierteCLP(pos.subtotal), 185, cord);       //Subtotal
          cord = cord + 5;
        }
      });
    }

    //Pie de factura
    doc.setFontSize(7);
    doc.setLineWidth(0.25);
    doc.rect(10, 230, 190, 60, 'S');

    //Condiciones comerciales
    doc.rect(15, 235, 100, 50, 'S');
    doc.line(15, 240, 115, 240);
    doc.setFont('Helvetica', 'bold');
    doc.text('Condiciones Comerciales', 16, 239);
    doc.text('1. Validez: 15 días', 16, 245);
    doc.text('2. Forma Pago: Contado/Transferencia bancaria', 16, 248);
    doc.text('3. Cuenta bancaria: Banco Estado', 16, 251);
    doc.text('Nro. cuenta vista : 36772379760', 16, 254);
    doc.text('A nombre de : Thecnical Service Spa', 16, 257);
    doc.text('Nota:', 16, 260);

    doc.setFontSize(12);
    doc.rect(120, 235, 80, 20, 'S');
    // Monto neto
    doc.text('MONTO NETO:', 125, 240);
    doc.text(neto, 175, 240);
    // IVA
    doc.text('I.V.A. 19%:', 125, 245);
    doc.text(iva, 175, 245);
    // Total
    doc.text('TOTAL:', 125, 250);
    doc.text(total, 175, 250);

    doc.setLineWidth(0.25);
    doc.line(10, 215, 355, 215);

    doc.save(`${nroFactura}.pdf`);
    //doc.output('dataurlnewwindow');
  }

  // Genera el PDF de factura
  public generarFactura(f: Factura, fecha?: string) {
    const doc = new jsPDF();
    const img = new Image();
    const rut = this.rutPipe.transform(f.persona.rut);
    const nombre = f.persona.nombre;
    const giro = f.persona.giro;
    const direccion = f.persona.direccion;
    const provincia = f.persona.provincia;
    const comuna = f.persona.comuna;
    const contacto = f.persona.contacto;
    const email = f.persona.email;
    const neto = this.convierteCLP(f.neto);
    const iva = this.convierteCLP(f.iva);
    const total = this.convierteCLP(f.total);
    fecha = this.datepipe.transform(new Date(fecha), 'dd-MM-yyyy');
    const nroFactura = f.codFactura.toString();

    //Seccion superior izquierda
    img.src = 'assets/Serviciotecnico-1.jpg';
    doc.addImage(img, 'JPEG', 10, 10, 40, 40);
    doc.setFontSize(13);
    doc.setFont('Helvetica', 'bold'); //negrita
    doc.text('TECHNICAL SERVICE M & G SPA', 51, 13);
    doc.setFontSize(10);
    doc.setFont('Helvetica', 'normal');
    doc.text('Giro: SERV. TEC. COM. REP. DE EQUIPOS,', 51, 18);
    doc.text('REPUESTOS E INSUMOS AUTOMOTRICES', 51, 23);
    doc.text('Email: MGAETE@TECHNICAL.SERVICE.CL', 51, 28);
    doc.text('Telefono: 947149483', 51, 33);
    doc.text('TIPO DE VENTA: DEL GIRO', 51, 38);

    //Datos del cliente
    doc.rect(10, 53, 120, 40, 'S');
    doc.text('SEÑOR(ES):', 11, 57);
    doc.text(nombre, 35, 57);
    // Rut
    doc.text('R.U.T:', 11, 62);
    doc.text(rut, 35, 62);
    // Giro
    doc.text('GIRO:', 11, 67);
    doc.text(giro, 35, 67);
    // Dirección
    doc.text('DIRECCIÓN:', 11, 72);
    doc.text(direccion, 35, 72);
    // Comuna
    doc.text('COMUNA:', 11, 77);
    doc.text(comuna, 35, 77);
    // Ciudad
    doc.text('PROVINCIA:', 66, 77);
    doc.text(provincia, 90, 77);
    // Telefono
    doc.text('CONTACTO:', 11, 82);
    doc.text(`${contacto} / ${email}`, 35, 82);
    // Método de pago
    doc.text('TIPO DE:', 11, 87);
    doc.text('COMPRA:', 11, 92);
    doc.text('Del giro', 35, 92);

    //Seccion superior derecha 
    doc.setDrawColor(0);
    doc.setFillColor(234, 234, 234);
    doc.rect(130, 5, 66, 35, 'S');
    doc.setFontSize(13);
    doc.setFont('Helvetica', 'bold'); //negrita
    doc.text('R.U.T.:77.132.092-9', 139, 13);
    doc.text('FACTURA ELECTRÓNICA', 134, 25);
    doc.text('N°' + nroFactura, 157, 37);
    doc.text('S.I.I. - SAN BERNARDO', 132, 45);
    doc.setFont('Helvetica', 'normal');
    doc.text('Fecha emisión: ' + fecha, 132, 55);

    //Detalle de factura
    doc.setLineWidth(0.25);
    doc.setFontSize(10);
    doc.line(10, 95, 355, 95);
    doc.line(10, 95, 10, 105);
    doc.text('Código.', 11, 100);
    doc.line(35, 95, 35, 105);
    doc.text('Descripción', 55, 100);
    doc.line(100, 95, 100, 105);
    doc.text('Cantidad', 105, 100);
    doc.line(125, 95, 125, 105);
    doc.text('Precio', 130, 100);
    doc.line(145, 95, 145, 105);
    doc.text('%Impto', 150, 100);
    doc.text('Adic', 150, 105);
    doc.line(165, 95, 165, 105);
    doc.text('%Desc.', 165, 100);
    doc.line(185, 95, 185, 105);
    doc.text('Valor', 190, 100);
    doc.line(10, 95, 10, 105);
    doc.setLineWidth(0.25);
    doc.line(10, 105, 355, 105);

    //Lista de productos
    doc.setFontSize(7);
    let cord = 110;
    f.detalle.forEach(pos => {
      if (pos.tipo == TipoProducto.Insumo) {
        doc.text(pos.producto.id.toString(), 15, cord);      //Código
        doc.text(pos.producto.descripcion, 40, cord);  //Descripción
        doc.text(this.convierteCLP(pos.producto.precioVenta), 133, cord);      //Precio 
      } else {
        doc.text(pos.servicio.id.toString(), 15, cord);      //Código
        doc.text(pos.servicio.descripcion, 40, cord);  //Descripción
        doc.text(this.convierteCLP(pos.servicio.precioVenta), 133, cord);      //Precio
      }
      doc.text(pos.cantidad.toString(), 113, cord);    //Cantidad
      // doc.text('%Impto', 150, cord);      //%Impuesto
      doc.text(pos.dcto.toString(), 180, cord);      //%Descuento
      doc.text(this.convierteCLP(pos.subtotal), 190, cord);       //Subtotal
      cord = cord + 5;
    });

    //Pie de factura
    doc.setFontSize(12);
    doc.setLineWidth(0.25);
    doc.rect(10, 230, 190, 60, 'S');

    img.src = 'assets/timbre_electronico.jpg';
    doc.addImage(img, 'JPEG', 15, 240, 80, 40);

    doc.rect(100, 235, 100, 40, 'S');
    // Monto neto
    doc.text('MONTO NETO:', 125, 240);
    doc.text(neto, 175, 240);
    // IVA
    doc.text('I.V.A. 19%:', 125, 245);
    doc.text(iva, 175, 245);
    // Impuesto
    // doc.text('IMPUESTO ADICIONAL:', 125, 250);
    // doc.text('$ 0', 175, 250);
    // Total
    doc.text('TOTAL:', 125, 255);
    doc.text(total, 175, 255);

    doc.setLineWidth(0.25);
    doc.line(10, 215, 355, 215);
    //doc.save(`${nroFactura}.pdf`);
    return doc.output('datauristring');
  }

  //-End Funciones-------------------------------//

  //-Setters-------------------------------------//
  public set action(action: string) {
    this._action = action;
  }

  public set active(active: string) {
    this._active = active;
  }

  public set option(option: number) {
    this._option = option;
  }

  public set disabled(disabled: string) {
    this._disabled = disabled;
  }

  public set error(error: boolean) {
    this._error = error;
  }

  //-End Setters----------------------------------//

  //-Getters--------------------------------------//
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  public get action(): string {
    return this._action;
  }
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  public get active(): string {
    return this._active;
  }
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  public get option(): number {
    return this._option;
  }
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  public get disabled(): string {
    return this._disabled;
  }
  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  public get error(): boolean {
    return this._error;
  }
  //-End Getters-----------------------------------//
}
