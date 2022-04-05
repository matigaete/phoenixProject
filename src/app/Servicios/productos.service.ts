import { Injectable } from '@angular/core';
import { Producto } from '../Interfaces/producto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DialogoConfirmacionComponent } from '../Include/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog'; 
import { UpdateProduct } from '../Interfaces/update-product';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient,
    private dialogo: MatDialog) { }

  public getProductos() {
    return this.http.get<Producto[]>(`${environment.baseUrl}api/productos`);
  }

  public getProductosInactivos() {
    return this.http.get<Producto[]>(`${environment.baseUrl}getProducts.php?codigo=inactives`);
  }

  public getProductosFiltro(codigoCategoria) {
    return this.http.get<Producto[]>(`${environment.baseUrl}getProducts.php?codigo=${codigoCategoria}`);
  }

  public getProducto(codigo: number | string) {
    return this.http.get<Producto>(`${environment.baseUrl}api/productos/${codigo}`);
  }

  public creaProducto(producto: Producto) {
    return this.http.post(`${environment.baseUrl}api/productos`, producto);
  }

  public actualizaProducto(producto: Producto) {
    return this.http.put(`${environment.baseUrl}updateProduct.php`, producto);
  }

  public actualizaProductos(productos: UpdateProduct[]) {
    return this.http.put(`${environment.baseUrl}updateProducts.php`, productos);
  }

  public bajaProducto(producto: Producto) {
    return this.http.put(`${environment.baseUrl}unsuscribeProduct.php`, producto);
  }

  public activaProducto(producto: Producto) {
    return this.http.put(`${environment.baseUrl}activateProduct.php`, producto);
  }

  public bajarProducto(producto: Producto) {
    return this.dialogo.open(DialogoConfirmacionComponent, {
      data: `¿Realmente quieres dar de baja a ${producto.nombre}?`
    });
  }

  public activarProducto(producto: Producto) {
    return this.dialogo.open(DialogoConfirmacionComponent, {
      data: `¿Desea recuperar el producto ${producto.nombre}?`
    });
  }
}
