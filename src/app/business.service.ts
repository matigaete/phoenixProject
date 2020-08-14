import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ilista } from './Interfaces/ilista';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private nombre : string;
  private categoria : string; 
  private aceptar : string; 
  private inicio : string;
  private action : string; 
  
  constructor(private router: Router) { 
    this.inicio = 'Inicio';
    this.action = 'Mantenedores'; 
    this.nombre = 'Nombre del producto';
    this.categoria = 'Categoría del producto';
    this.aceptar = 'Aceptar'; 
  }
  
//-Listas desplegables--------------------------//
  public getMantenedores() : Ilista[] {
    return [{
        id : 1,
        nombre : 'Productos',  
        path : 'index-productos',
    }/*, {
        id : 2,
        nombre : '',
        path : 'update',
    }, {
        id : 3,
        nombre : '',
        path : 'find',
    }*/
    ]
  }
  
  public getAcciones() : Ilista[] {
    return [{
        id : 1,
        nombre : 'Agregar', 
    }, {
        id : 2,
        nombre : 'Modificar', 
    }, {
        id : 3,
        nombre : 'Consultar', 
    }
    ]
  }
  
  public getCategorias() : Ilista[] {
    return [{
        id : 1,
        nombre : 'Maquina', 
    }, {
        id : 2,
        nombre : 'Herramienta',
    } ]
  }
//-End listas----------------------------------//
  
//-Funciones-----------------------------------//
  public redirect( path ) {
      this.router.navigate([path]);
  }
  
//-End Funciones-------------------------------//
  
//-Setters-------------------------------------//
  public setAction(action : string) : void{
      this.action = action;
  }
  
  public setInicio(inicio : string) : void {
      this.inicio = inicio;
  }
  
  public setNombre(nombre : string) : void {
      this.nombre = nombre;
  }
  
  public setCategoria(categoria : string) : void{
      this.categoria = categoria;
  }
  
  public setAceptar(aceptar : string) : void{
      this.aceptar = aceptar;
  }
//-End Setters----------------------------------//
  
//-Getters--------------------------------------//
  public getAction() : string {
      return this.action;
  }
  
  public getInicio() : string {
      return this.inicio;
  }
  
  public getNombre() : string {
      return this.nombre;
  }
  
  public getCategoria() : string {
      return this.categoria;
  }
  
  public getAceptar() : string {
      return this.aceptar;
  }
//-End Getters-----------------------------------//
}
