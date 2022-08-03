import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DialogoConfirmacionComponent } from '../Include/dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';  
import { Persona } from '../Interfaces/persona';
import { Region } from '../Interfaces/region';
import { TipoPersona } from '../Utils/persona.constants';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient,
    private dialogo: MatDialog) { }

  public getRegiones() {
    return this.http.get<Region[]>(`${environment.baseUrl}api/regiones`);
  }

  public getPersonas(tipo: TipoPersona) {
    return this.http.get<Persona[]>(`${environment.baseUrl}api/personas/${tipo}`);
  }

  public getClientesFiltro(codigo:string) {
    return this.http.get<Persona[]>(`${environment.baseUrl}api/clientes/${codigo}`);
  }

  public getProveedoresFiltro(codigo:string) {
    return this.http.get<Persona[]>(`${environment.baseUrl}api/proveedores/${codigo}`);
  }

  public getPersona(codigo: string, tipo: string) {
    return this.http.get<Persona>(`${environment.baseUrl}api/personas/${codigo}/${tipo}`);
  }

  public creaPersona(persona: Persona) {
    return this.http.post(`${environment.baseUrl}api/personas`, persona);
  }

  public actualizaPersona(persona: Persona) {
    return this.http.put(`${environment.baseUrl}api/personas`, persona);
  }

  public bajarPersona(persona: Persona) {
    return this.dialogo.open(DialogoConfirmacionComponent, {
      data: `¿Realmente quieres dar de baja a ${persona.nombre}?`
    });
  }
  
}

