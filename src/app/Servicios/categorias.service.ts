import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Categoria } from '../Clases/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  public url = environment.baseUrl;
  private _nombre: string;
  private _nuevo: string;
  private _mensajeCrear: string;
  private _mensajeCreado: string;
  private _mensajeActualizar: string;
  private _mensajeActualizado: string;

  constructor(private http: HttpClient) {
    this._nombre = 'Nombre de categoría:';
    this._nuevo = 'Nueva categoría';
    this._mensajeCrear = '¿Crear categoría ¬?';
    this._mensajeCreado = 'Categoría creada';
    this._mensajeActualizado = 'Categoría actualizada';
  }

  public getCategorias() {
    return this.http.get<Categoria[]>(`${this.url}getCategories.php`);
  }

  public creaCategoria(categoria: Categoria) {
    return this.http.post(`${this.url}addCategorie.php`, categoria);
  }

  public actualizaCategoria(categoria: Categoria) {
    return this.http.put(`${this.url}updateCategorie.php`, categoria);
  }

  public set nombre(nombre: string) {
    this._nombre = nombre;
  }

  public set nuevo(nuevo: string) {
    this._nuevo = nuevo;
  }

  public set mensajeCrear(mensajeCrear: string) {
    this._mensajeCrear = mensajeCrear;
  }

  public set mensajeCreado(mensajeCreado: string) {
    this._mensajeCreado = mensajeCreado;
  }

  public set mensajeActualizado(mensajeCreado: string) {
    this._mensajeCreado = mensajeCreado;
  }

  public get nombre(): string {
    return this._nombre;
  }

  public get nuevo(): string {
    return this._nuevo;
  }

  public get mensajeCrear(): string {
    return this._mensajeCrear;
  }

  public get mensajeCreado(): string {
    return this._mensajeCreado;
  }

  public get mensajeActualizado(): string {
    return this._mensajeActualizado;
  }

  public getMensajeActualizar(mensaje1: string, mensaje2): string {
    return `¿Desea actualizar categoría ${mensaje1} por ${mensaje2}?`;
  }

  public getMensajeCrear(mensajeCrear: string): string {
    return this._mensajeCrear.replace('¬', mensajeCrear);
  }
}
