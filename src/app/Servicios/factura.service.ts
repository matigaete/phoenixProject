import { Injectable } from '@angular/core';
import { Producto } from '../Clases/producto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DialogoConfirmacionComponent } from '../Include/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Factura } from '../Clases/factura';
import { DetalleFactura } from '../Clases/detalle-factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  public url = environment.baseUrl;
  private _codigo: string;
  private _nombre: string;
  private _descripcion: string;
  private _stock: string;
  private _stockCritico: string;
  private _precioCompra: string;
  private _precioVenta: string;
  private _categoria: string;
  private _active: string;
  private _info: string;

  private _mensajeCodigo: string;
  private _mensajeDescripcion: string;
  private _mensajeStock: string;
  private _mensajePrecio: string;
  private _mensajeColumnas: string;
  private _mensajeBajado: string;
  private _mensajeActualizado: string;
  private _mensajeCreado: string;
  private _mensajeActivado: string;

  constructor(private http: HttpClient,
    private dialogo: MatDialog) {
    this._codigo = 'Código del producto';
    this._nombre = 'Nombre del producto';
    this._categoria = 'Categoría del producto';
    this._descripcion = 'Descripción del producto';
    this._stock = 'Stock';
    this._stockCritico = 'Stock crítico';
    this._precioCompra = 'Precio de compra';
    this._precioVenta = 'Precio de venta';
    this._active = 'Dar de baja';
    this._info = 'Aqui contiene la información del producto';
    this._mensajeCodigo = 'Debe de ingresar un código para el producto';
    this._mensajeDescripcion = 'Ingrese una descripción';
    this._mensajeStock = 'Stock debe ser mayor a 0';
    this._mensajePrecio = 'Ingrese un precio mayor a 0';
    this._mensajeColumnas = 'Todas las columnas están desplegadas';
    this._mensajeBajado = 'Producto dado de baja';
    this._mensajeActualizado = 'Producto actualizado';
    this._mensajeCreado = 'Producto añadido';
    this._mensajeActivado = 'Producto activado';
  }

  //-Respuestas HTTP-------------------------------//

  public getListaFacturas() {
    return this.http.get<Factura[]>(`${this.url}getBills.php?codigo=all`);
  }

  public getFactura(codigo: number | string) {
    return this.http.get<Factura>(`${this.url}getBill.php?codigo=${codigo}`);
  }

  public creaFactura(factura: Factura) {
    return this.http.post(`${this.url}addBill.php`, factura);
  }

  public actualizaFactura(factura: Factura) {
    return this.http.put(`${this.url}updateBill.php`, factura);
  }

  public getListaDetalle() {
    return this.http.get<DetalleFactura[]>(`${this.url}getDetailBill.php?codigo=all`);
  }

  public creaDetalle(detalle: DetalleFactura[]) {
    return this.http.post(`${this.url}addDetailBill.php`, detalle);
  }

  public actualizaDetalle(detalle: DetalleFactura[]) {
    return this.http.put(`${this.url}updateDetailBill.php`, detalle);
  }

  //-End Respuestas HTTP----------------------------------//

  //-Mensajes Dialogos-----------------------------------//

  //-End Mensajes----------------------------------//

  //-Funciones-----------------------------------//

  //-End Funciones-------------------------------//

  //-Setters-------------------------------------//  
  public set codigo(codigo: string) {
    this._codigo = codigo;
  }

  public set nombre(nombre: string) {
    this._nombre = nombre;
  }

  public set categoria(categoria: string) {
    this._categoria = categoria;
  }

  public set active(active: string) {
    this._active = active;
  }

  public set descripcion(descripcion: string) {
    this._descripcion = descripcion;
  }

  public set stock(stock: string) {
    this._stock = stock;
  }

  public set stockCritico(stockCritico: string) {
    this._stockCritico = stockCritico;
  }

  public set precioCompra(precioCompra: string) {
    this._precioCompra = precioCompra;
  }

  public set precioVenta(precioVenta: string) {
    this._precioVenta = precioVenta;
  }

  public set info(info: string) {
    this._info = info;
  }

  public set mensajeCodigo(mensajeCodigo: string) {
    this._mensajeCodigo = mensajeCodigo;
  }

  public set mensajeDescripcion(mensajeDescripcion: string) {
    this._mensajeDescripcion = mensajeDescripcion;
  }

  public set mensajeStock(mensajeStock: string) {
    this._mensajeStock = mensajeStock;
  }

  public set mensajePrecio(mensajePrecio: string) {
    this._mensajePrecio = mensajePrecio;
  }

  public set mensajeColumnas(mensajeColumnas: string) {
    this._mensajeColumnas = mensajeColumnas;
  }

  public set mensajeActualizado(mensajeActualizado: string) {
    this._mensajeActualizado = mensajeActualizado;
  }

  public set mensajeCreado(mensajeCreado: string) {
    this._mensajeCreado = mensajeCreado;
  }

  public set mensajeBajado(mensajeBajado: string) {
    this._mensajeBajado = mensajeBajado;
  }

  public set mensajeActivado(mensajeActivado: string) {
    this._mensajeActivado = mensajeActivado;
  }
  //-End Setters----------------------------------//

  //-Getters--------------------------------------//
  public get nombre(): string {
    return this._nombre;
  }

  public get categoria(): string {
    return this._categoria;
  }

  public get codigo(): string {
    return this._codigo;
  }

  public get active(): string {
    return this._active;
  }

  public get descripcion(): string {
    return this._descripcion;
  }

  public get stock(): string {
    return this._stock;
  }

  public get stockCritico(): string {
    return this._stockCritico;
  }

  public get precioCompra(): string {
    return this._precioCompra;
  }

  public get precioVenta(): string {
    return this._precioVenta;
  }

  public get info(): string {
    return this._info;
  }

  public get mensajeCodigo(): string {
    return this._mensajeCodigo;
  }

  public get mensajeDescripcion(): string {
    return this._mensajeDescripcion;
  }

  public get mensajeStock(): string {
    return this._mensajeStock;
  }

  public get mensajePrecio(): string {
    return this._mensajePrecio;
  }

  public get mensajeColumnas(): string {
    return this._mensajeColumnas;
  }

  public get mensajeActualizado(): string {
    return this._mensajeActualizado;
  }

  public get mensajeCreado(): string {
    return this._mensajeCreado;
  }

  public get mensajeBajado(): string {
    return this._mensajeBajado;
  }

  public get mensajeActivado(): string {
    return this._mensajeActivado;
  }
  //-End Getters-----------------------------------//
}
