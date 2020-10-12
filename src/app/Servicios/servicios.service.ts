import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { Servicio } from '../Clases/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  public url = environment.baseUrl;
  private _codigo: string;
  private _nombre: string;
  private _descripcion: string; 
  private _precioVenta: string; 
  private _info: string;

  private _mensajeCodigo: string;
  private _mensajeDescripcion: string; 
  private _mensajePrecio: string;
  private _mensajeColumnas: string; 
  private _mensajeActualizado: string;
  private _mensajeCreado: string; 

  constructor(private http: HttpClient) {
    this._codigo = 'Código del servicio';
    this._nombre = 'Nombre del servicio'; 
    this._descripcion = 'Descripción del servicio';  
    this._precioVenta = 'Precio de venta'; 
    this._info = 'Aqui contiene la información del servicio';
    this._mensajeCodigo = 'Debe de ingresar un código para el servicio';
    this._mensajeDescripcion = 'Ingrese una descripción'; 
    this._mensajePrecio = 'Ingrese un precio mayor a 0';
    this._mensajeColumnas = 'Todas las columnas están desplegadas'; 
    this._mensajeActualizado = 'Servicio actualizado';
    this._mensajeCreado = 'Servicio añadido'; 
  }

  //-Respuestas HTTP-------------------------------//

  public getServicios() {
    return this.http.get<Servicio[]>(`${this.url}getServices.php`);
  }

  public getServicio(codigo: number | string) {
    return this.http.get<Servicio>(`${this.url}getService.php?codigo=${codigo}`);
  }

  public creaServicio(servicio: Servicio) {
    return this.http.post(`${this.url}addService.php`, servicio);
  }

  public actualizaServicio(servicio: Servicio) {
    return this.http.put(`${this.url}updateService.php`, servicio);
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

  public set descripcion(descripcion: string) {
    this._descripcion = descripcion;
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

  //-End Setters----------------------------------//

  //-Getters--------------------------------------//
  public get nombre(): string {
    return this._nombre;
  }

  public get codigo(): string {
    return this._codigo;
  }

  public get descripcion(): string {
    return this._descripcion;
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
  //-End Getters-----------------------------------//
}
