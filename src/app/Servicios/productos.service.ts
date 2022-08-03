import { Injectable } from '@angular/core';
import { Producto } from '../Interfaces/producto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DialogoConfirmacionComponent } from '../Include/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient,
    private dialogo: MatDialog) { }

  getProductos() {
    return this.http.get<Producto[]>(`${environment.baseUrl}api/productos`);
  }

  getProductosPorCategoria(codigoCategoria) {
    return this.http.get<Producto[]>(`${environment.baseUrl}api/${codigoCategoria}/productos`);
  }

  getProducto(codigo: number | string) {
    return this.http.get<Producto>(`${environment.baseUrl}api/productos/${codigo}`);
  }

  creaProducto(producto: Producto) {
    return this.http.post(`${environment.baseUrl}api/productos`, producto);
  }

  actualizaProducto(producto: Producto) {
    return this.http.put(`${environment.baseUrl}api/productos`, producto);
  }

  eliminaProducto(codigo: number | string) {
    return this.http.delete(`${environment.baseUrl}api/productos/${codigo}`);
  }

  eliminarProducto(producto: Producto) {
    return this.dialogo.open(DialogoConfirmacionComponent, {
      data: `¿Realmente quieres eliminar ${producto.nombre}?`
    });
  }
}
