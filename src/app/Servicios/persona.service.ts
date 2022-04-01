import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DialogoConfirmacionComponent } from '../Include/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';  
import { Persona } from '../Interfaces/persona';
import { Region } from '../Interfaces/region';
import { Provincia } from '../Interfaces/provincia';
import { Comuna } from '../Interfaces/comuna';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient,
    private dialogo: MatDialog) { }

  public getRegiones() {
    return this.http.get<Region[]>(`${environment.baseUrl}getRegiones.php`);
  }

  public getProvincias(id: number) {
    return this.http.get<Provincia[]>(`${environment.baseUrl}getProvincias.php?codigo=${id}`);
  }

  public getComunas(id: number) {
    return this.http.get<Comuna[]>(`${environment.baseUrl}getComunas.php?codigo=${id}`);
  }

  public getListaClientes() {
    return this.http.get<Persona[]>(`${environment.baseUrl}getClients.php`);
  }

  public getListaProveedores() {
    return this.http.get<Persona[]>(`${environment.baseUrl}getProviders.php`);
  }

  public getClientesFiltro(codigo:string) {
    return this.http.get<Persona[]>(`${environment.baseUrl}getClientsFilter.php?codigo=${codigo}`);
  }

  public getProveedoresFiltro(codigo:string) {
    return this.http.get<Persona[]>(`${environment.baseUrl}getProvidersFilter.php?codigo=${codigo}`);
  }

  public getCliente(codigo: string) {
    return this.http.get<Persona>(`${environment.baseUrl}getClient.php?codigo=${codigo}`);
  }

  public getProveedor(codigo: string) { 
    return this.http.get<Persona>(`${environment.baseUrl}getProvider.php?codigo=${codigo}`);
  }

  public creaPersona(persona: Persona) {
    return this.http.post(`${environment.baseUrl}addPerson.php`, persona);
  }

  public actualizaPersona(persona: Persona) {
    return this.http.put(`${environment.baseUrl}updatePerson.php`, persona);
  }

  public bajarPersona(persona: Persona) {
    return this.dialogo.open(DialogoConfirmacionComponent, {
      data: `¿Realmente quieres dar de baja a ${persona.nombre}?`
    });
  }
  
}

