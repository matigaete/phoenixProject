import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ilista } from './Interfaces/ilista';
import { Producto } from './Clases/producto';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  private codigo : string;
  private nombre : string;
  private descripcion : string;
  private stock : string;
  private stockCritico : string;
  private precioCompra : string;
  private precioVenta : string;
  private categoria : string; 
  private aceptar : string; 
  private inicio : string;
  private active : string;
  private action : string; 
  private option : number;
  private info : string;
  
  constructor(private router: Router) { 
    this.inicio = 'Inicio';
    this.action = 'Mantenedores'; 
    this.codigo = 'Código del producto';
    this.nombre = 'Nombre del producto';
    this.categoria = 'Categoría del producto';
    this.descripcion = 'Descripción del producto';
    this.stock = 'Stock';
    this.stockCritico = 'Stock crítico';
    this.precioCompra = 'Precio de compra';
    this.precioVenta = 'Precio de venta';
    this.aceptar = 'Aceptar';  
    this.option = 1;
    this.active = 'active';
    this.info = 'Aqui contiene la información del producto';
  }
  
//-Listas desplegables--------------------------//
  public getMantenedores() : Ilista[] {
    return [{
        id : 1,
        nombre : 'Productos',  
        path : 'index-productos',
    }, {
        id : 2,
        nombre : 'Categorías',
        path : 'index-categorias',
    }/*, {
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
    }, {
        id : 4,
        nombre : 'Listado', 
    }
    ]
  }
  
  public getCategorias() : Ilista[] {
    return [{
        id : 1,
        nombre : 'Herramienta', 
    }, {
        id : 2,
        nombre : 'Maquina',
    } ]
  }

  public getProductos() : Producto[] {
    return [new Producto(1, 'Compresor de prueba', 'Herramienta', 
    'Compresor de pana para familia de pana', 10, 1, 1000, 3000),
    new Producto(2, 'Elevador', 'Maquina', 
    'PA SUBIR A LA CIMA DEL MUNDO', 3, 1, 10000, 50000),
    new Producto(3, 'Aceite', 'Herramienta', 
    'Pa hacer unas papas d pana', 100, 10, 100, 3000), 
    ]
  } 
//-End listas----------------------------------//
  
//-Funciones-----------------------------------//
  public redirect(path : string) : void {
      this.router.navigate([path]);
  }

  public asignarOpcion(option : number, acciones : Ilista[]) : Ilista[] {
    this.option = option;
    this.clearCurrent(acciones);
    acciones[option - 1].current = this.active;
    return acciones;
  }

  public clearCurrent(acciones : Ilista[]) : void {
    for(let i = 0 ; i < acciones.length; i++){
      acciones[i].current = null;
    }
  }

  public filtrarProductos(productos : Producto[], filtro : string) : Producto[] {
    productos = this.getProductos();
    var aux = new Array;
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].getCategoria() == filtro) {
        aux.push(productos[i]); 
      } 
    }
    return aux;
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

  public setCodigo(codigo : string) : void {
    this.codigo = codigo;
  }

  public setActive(active : string) : void {
    this.active = active;
  }

  public setOption(option : number) : void {
    this.option = option;
  }

  public setDescripcion(descripcion : string) : void {
    this.descripcion = descripcion; 
  }

  public setStock(stock : string) : void {
    this.stock = stock; 
  }

  public setStockCritico(stockCritico : string) : void {
    this.stockCritico = stockCritico; 
  }

  public setPrecioCompra(precioCompra : string) : void {
    this.precioCompra = precioCompra; 
  }

  public setprecioVenta(precioVenta : string) : void {
    this.precioVenta = precioVenta; 
  }

  public setInfo(info : string) : void {
    this.info = info; 
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
  
  public getCodigo() : string {
    return this.codigo;
  }

  public getActive() : string {
    return this.active;
  }

  public getOption() : number {
    return this.option;
  }

  public getDescripcion() : string {
    return this.descripcion;
  }

  public getStock() : string {
    return this.stock;
  }

  public getStockCritico() : string {
    return this.stockCritico;
  }

  public getPrecioCompra() : string {
    return this.precioCompra;
  }
  
  public getPrecioVenta() : string {
    return this.precioVenta;
  }

  public getInfo() : string {
    return this.info;
  }
//-End Getters-----------------------------------//
}
