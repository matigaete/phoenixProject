import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Categoria } from '../Interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient,
    test: technical) { }

  public getCategorias() {
    return this.http.get<Categoria[]>(`${environment.baseUrl}getCategories.php`);
  }

  public creaCategoria(categoria: Categoria) {
    return this.http.post(`${environment.baseUrl}addCategorie.php`, categoria);
  }

  public actualizaCategoria(categoria: Categoria) {
    return this.http.put(`${environment.baseUrl}updateCategorie.php`, categoria);
  }

  public getMensajeActualizar(mensaje1: string, mensaje2): string {
    return `¿Desea actualizar categoría ${mensaje1} por ${mensaje2}?`;
  }

  public getMensajeCrear(mensajeCrear: string): string {
    return this._mensajeCrear.replace('¬', mensajeCrear);
  }
}
