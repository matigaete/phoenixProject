import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment'; 
import { Servicio } from '../Interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {

  constructor(private http: HttpClient) {}

  public getServicios() {
    return this.http.get<Servicio[]>(`${environment.baseUrl}api/servicios`);
  }

  public getServicio(codigo: number | string) {
    return this.http.get<Servicio>(`${environment.baseUrl}api/servicios/${codigo}`);
  }

  public creaServicio(servicio: Servicio) {
    return this.http.post(`${environment.baseUrl}api/servicios`, servicio);
  }

  public actualizaServicio(servicio: Servicio) {
    return this.http.put(`${environment.baseUrl}updateService.php`, servicio);
  }

}
