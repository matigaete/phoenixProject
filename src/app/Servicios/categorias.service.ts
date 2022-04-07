import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Categoria } from 'src/app/Interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) { }

  public getCategorias() {
    return this.http.get<Categoria[]>(`${environment.baseUrl}api/categorias`);
  }

  public creaCategoria(categoria: Categoria) {
    return this.http.post(`${environment.baseUrl}api/categorias`, categoria);
  }

  public actualizaCategoria(categoria: Categoria) {
    return this.http.put(`${environment.baseUrl}api/categorias`, categoria);
  }

  public getMensajeActualizar(mensaje: string ): string {
    return `¿Desea actualizar categoría a ${mensaje}?`;
  }

  public getMensajeCrear(mensajeCrear: string): string {
    return `¿Crear categoría ${mensajeCrear}?`;
  }
}
