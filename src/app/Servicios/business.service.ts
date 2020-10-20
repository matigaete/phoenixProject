import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ilista } from '../Interfaces/ilista';
import { Producto } from '../Clases/producto'; 
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  public url = environment.baseUrl;
  private _aceptar: string;
  private _inicio: string;
  private _active: string;
  private _action: string;
  private _option: number;
  private _disabled: string;
  private _error: boolean;
  private _mensajeError: string;
  private _mensajeNombre: string;

  constructor(private router: Router,
    private snackBar: MatSnackBar) {

    this._inicio = 'Inicio';
    this._action = 'Mantenedores';
    this._aceptar = 'Aceptar';
    this._option = 1;
    this._active = 'active';
    this._disabled = 'disabled';
    this._mensajeError = 'Complete los campos faltantes';
    this._mensajeNombre = 'Ingrese un nombre';
    this._error = true;
  }

  //-Listas desplegables--------------------------//
  public getMantenedores(): Ilista[] {
    return [{
      id: 1,
      nombre: 'Productos',
      path: 'productos',
    }, {
      id: 2,
      nombre: 'Categorías',
      path: 'categorias',
    }, {
      id: 3,
      nombre: 'Servicios',
      path: 'servicios',
    }, {
      id: 4,
      nombre: 'Personas',
      path: 'personas',
    // }, {
    //   id: 3,
    //   nombre: 'Clientes',
    //   path: 'clientes',
    // }, {
    //   id: 4,
    //   nombre: 'Proveedores',
    //   path: 'proveedores',
    }]
  }

  public getAcciones(): Ilista[] {
    return [{
      id: 1,
      nombre: 'Agregar',
    }, {
      id: 2,
      nombre: 'Modificar',
    }, {
      id: 3,
      nombre: 'Consultar',
    }, {
      id: 4,
      nombre: 'Listado',
    }
    ]
  }

  public getFormControl(error: boolean) {
    return {
      'form-control': true,
      'is-invalid': error,
      'is-valid': !error
    }
  }

  public validaCampo(campo: any, error: boolean) {
    if (campo == '' || campo == null) {
      error = true;
    } else {
      error = false;
    }
    return error;
  }

  //-End listas----------------------------------//

  //-Funciones-----------------------------------//
  public redirect(path: string): void {
    this.router.navigate([path]);
  }

  public asignarOpcion(option: number, acciones: Ilista[]): Ilista[] {
    this.option = option;
    this.clearCurrent(acciones);
    acciones[option - 1].current = this.active;
    return acciones;
  }

  public clearCurrent(acciones: Ilista[]): void {
    for (let i = 0; i < acciones.length; i++) {
      acciones[i].current = null;
    }
  }

  public getAlert(message: string){
    this.snackBar.open(message, undefined, {
      duration: 1500,
    });
  }

  //-End Funciones-------------------------------//

  //-Setters-------------------------------------//
  public set action(action: string) {
    this._action = action;
  }

  public set inicio(inicio: string) {
    this._inicio = inicio;
  }

  public set aceptar(aceptar: string) {
    this._aceptar = aceptar;
  }

  public set active(active: string) {
    this._active = active;
  }

  public set option(option: number) {
    this._option = option;
  }

  public set disabled(disabled: string) {
    this._disabled = disabled;
  }

  public set error(error: boolean) {
    this._error = error;
  }

  public set mensajeError(mensajeError: string) {
    this._mensajeError = mensajeError;
  }

  public set mensajeNombre(mensajeNombre: string) {
    this._mensajeNombre = mensajeNombre;
  }

  //-End Setters----------------------------------//
  
  //-Getters--------------------------------------//
  public get action(): string {
    return this._action;
  }

  public get inicio(): string {
    return this._inicio;
  }

  public get aceptar(): string {
    return this._aceptar;
  }

  public get active(): string {
    return this._active;
  }

  public get option(): number {
    return this._option;
  }

  public get disabled(): string {
    return this._disabled;
  }

  public get error(): boolean {
    return this._error;
  }

  public get mensajeError(): string {
    return this._mensajeError;
  }

  public get mensajeNombre(): string {
    return this._mensajeNombre;
  }
  //-End Getters-----------------------------------//
}
