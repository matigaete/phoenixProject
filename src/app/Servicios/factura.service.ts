import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Factura } from 'src/app/Interfaces/factura';
import { DetalleFactura } from 'src/app/Interfaces/detalle-factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  public getListaFacturasCompra() {
    return this.http.get<Factura[]>(`${environment.baseUrl}api/facturas`);
  }

  public getFacturaCompra(codigo: number | string) {
    return this.http.get<Factura>(`${environment.baseUrl}getPurchaseBill.php?codigo=${codigo}`);
  }

  public getUltimaFactura() {
    return this.http.get<{cod: number}>(`${environment.baseUrl}getLastBill.php`);
  }

  public getUltimaCotizacion() {
    return this.http.get<{cod: number}>(`${environment.baseUrl}getLastCotizacion.php`);
  }

  public creaFacturaCompra(factura: Factura) {
    return this.http.post(`${environment.baseUrl}addPurchaseBill.php`, factura);
  }

  public actualizaFacturaCompra(factura: Factura) {
    return this.http.put(`${environment.baseUrl}updateBill.php`, factura);
  }

  public getListaDetalleCompra() {
    return this.http.get<DetalleFactura[]>(`${environment.baseUrl}getDetailBill.php?codigo=all`);
  }

  public actualizaDetalleCompra(detalle: DetalleFactura[]) {
    return this.http.put(`${environment.baseUrl}updateDetailBill.php`, detalle);
  }

  public getListaFacturasVenta() {
    return this.http.get<Factura[]>(`${environment.baseUrl}getSellBills.php?codigo=all`);
  }

  public getFacturaVenta(codigo: number | string) {
    return this.http.get<Factura>(`${environment.baseUrl}getSellBill.php?codigo=${codigo}`);
  }

  public creaFacturaVenta(factura: Factura) {
    return this.http.post(`${environment.baseUrl}addSellBill.php`, factura);
  }

  public actualizaFacturaVenta(factura: Factura) {
    return this.http.put(`${environment.baseUrl}updateBill.php`, factura);
  }

  public getListaDetalleVenta() {
    return this.http.get<DetalleFactura[]>(`${environment.baseUrl}getDetailBill.php?codigo=all`);
  }

  public actualizaDetalleVenta(detalle: DetalleFactura[]) {
    return this.http.put(`${environment.baseUrl}updateDetailBill.php`, detalle);
  }

  public creaCotizacion(factura: Factura) {
    return this.http.post(`${environment.baseUrl}addCotizacion.php`, factura);
  }

  public actualizaCotizacion(factura: Factura) {
    return this.http.put(`${environment.baseUrl}updateCotizacion.php`, factura);
  }

  public sendEmail(url, data) {
    return this.http.post(url, data);
  }
  
}
