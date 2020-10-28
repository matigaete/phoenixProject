import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ilista } from '../Interfaces/ilista';
import { Producto } from '../Clases/producto'; 
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import jsPDF from 'jspdf';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RutPipe } from '../Pipes/rut.pipe';
import { Factura } from '../Clases/factura';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  public url = environment.baseUrl;
  private _aceptar: string;
  private _inicio: string;
  private _active: string;
  private _action: string;
  private _option: number;
  private _disabled: string;
  private _error: boolean;
  private _mensajeError: string;
  private _mensajeNombre: string;

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private currencypipe: CurrencyPipe,
    private rutPipe: RutPipe,
    private datepipe: DatePipe) {

    this._inicio = 'Inicio';
    this._action = 'Mantenedores';
    this._aceptar = 'Aceptar';
    this._option = 1;
    this._active = 'active';
    this._disabled = 'disabled';
    this._mensajeError = 'Complete los campos faltantes';
    this._mensajeNombre = 'Ingrese un nombre';
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
    }]
  }

  public getAcciones(): Ilista[] {
    return [{
      id: 1,
      nombre: 'Agregar',
    }, {
      id: 2,
      nombre: 'Modificar',
    }, {
      id: 3,
      nombre: 'Consultar',
    }, {
      id: 4,
      nombre: 'Listado',
    }
    ]
  }

  public getFormControl(error: boolean) {
    return {
      'form-control': true,
      'is-invalid': error,
      'is-valid': !error
    }
  }

  public validaCampo(campo: any, error: boolean) {
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
      acciones[i].current = null;
    }
  }

  public getAlert(message: string){
    this.snackBar.open(message, undefined, {
      duration: 1500,
    });
  }


  public convierteCLP(valor: number): string {
    return this.currencypipe.transform(valor, 'CLP', 'symbol-narrow').toString();
  }

  // Genera el PDF 
  public generarPDF(f: Factura, fecha?: string) {
    var doc = new jsPDF();
    var img = new Image();
    var rut = this.rutPipe.transform(f.persona.rut);
    var nombre = f.persona.nombre;
    var giro = f.persona.giro;
    var direccion = f.persona.direccion;
    var provincia = f.persona.provincia;
    var comuna = f.persona.comuna;
    var contacto = f.persona.contacto;
    var email = f.persona.email;
    var neto = this.convierteCLP(f.neto);
    var iva = this.convierteCLP(f.iva);
    var total = this.convierteCLP(f.total);
    var fecha = this.datepipe.transform(new Date(fecha), 'dd-MM-yyyy');
    var nroFactura = f.codFactura.toString();

    //Seccion superior izquierda
    img.src = 'assets/Serviciotecnico-1.jpg'
    doc.addImage(img, 'JPEG', 10, 10, 40, 40);
    doc.setFontSize(13);
    doc.setFont("Helvetica", "bold"); //negrita
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
    doc.setFont("Helvetica", "bold"); //negrita
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
    var cord = 110;
    f.detalle.forEach(pos => {
      if (pos.tipo == 'P') {
        doc.text(pos.producto.codigo.toString(), 15, cord);      //Código
        doc.text(pos.producto.descripcion, 40, cord);  //Descripción
        doc.text(this.convierteCLP(pos.producto.precioVenta), 133, cord);      //Precio 
      } else {
        doc.text(pos.servicio.codigo.toString(), 15, cord);      //Código
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

    img.src = 'assets/timbre_electronico.jpg'
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

    doc.save(`${nroFactura}.pdf`);
    // doc.output('dataurlnewwindow');
  }

  //-End Funciones-------------------------------//

  //-Setters-------------------------------------//
  public set action(action: string) {
    this._action = action;
  }

  public set inicio(inicio: string) {
    this._inicio = inicio;
  }

  public set aceptar(aceptar: string) {
    this._aceptar = aceptar;
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

  public set mensajeError(mensajeError: string) {
    this._mensajeError = mensajeError;
  }

  public set mensajeNombre(mensajeNombre: string) {
    this._mensajeNombre = mensajeNombre;
  }

  //-End Setters----------------------------------//
  
  //-Getters--------------------------------------//
  public get action(): string {
    return this._action;
  }

  public get inicio(): string {
    return this._inicio;
  }

  public get aceptar(): string {
    return this._aceptar;
  }

  public get active(): string {
    return this._active;
  }

  public get option(): number {
    return this._option;
  }

  public get disabled(): string {
    return this._disabled;
  }

  public get error(): boolean {
    return this._error;
  }

  public get mensajeError(): string {
    return this._mensajeError;
  }

  public get mensajeNombre(): string {
    return this._mensajeNombre;
  }
  //-End Getters-----------------------------------//
}
