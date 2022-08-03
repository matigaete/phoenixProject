import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Factura } from 'src/app/Interfaces/factura';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  public getListaFacturasCompra() {
    return this.http.get<Factura[]>(`${environment.baseUrl}api/facturas`);
  }

  public getFacturaCompra(codigo: number | string) {
    return this.http.get<Factura>(`${environment.baseUrl}api/facturas/${codigo}`);
  }

  public creaFacturaCompra(factura: Factura) {
    return this.http.post(`${environment.baseUrl}api/facturas`, factura);
  }

  public actualizaFacturaCompra(factura: Factura) {
    return this.http.put(`${environment.baseUrl}api/facturas`, factura);
  }

  public getListaFacturasVenta() {
    return this.http.get<Factura[]>(`${environment.baseUrl}api/facturas`);
  }

  public getFacturaVenta(codigo: number | string) {
    return this.http.get<Factura>(`${environment.baseUrl}api/facturas/${codigo}`);
  }

  public creaFacturaVenta(factura: Factura) {
    return this.http.post(`${environment.baseUrl}api/facturas`, factura);
  }

  public actualizaFacturaVenta(factura: Factura) {
    return this.http.put(`${environment.baseUrl}api/facturas`, factura);
  }

  public creaCotizacion(factura: Factura) {
    return this.http.post(`${environment.baseUrl}api/cotizaciones`, factura);
  }

  public actualizaCotizacion(factura: Factura) {
    return this.http.put(`${environment.baseUrl}api/cotizaciones`, factura);
  }

  public sendEmail(user: User) {
    return this.http.post(`${environment.baseUrl}sendmail`, user);
  }
  
}
