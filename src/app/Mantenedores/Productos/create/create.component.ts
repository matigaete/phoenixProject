import { Component, OnInit, Input } from '@angular/core'; 
import { Producto } from 'src/app/Clases/producto';
import { MatSnackBar } from '@angular/material/snack-bar'; 

import { BusinessService } from '../../../Servicios/business.service';
import { ProductosService } from 'src/app/Servicios/productos.service'; 
import { CategoriasService } from 'src/app/Servicios/categorias.service';

@Component({
  selector: 'app-create',
  template:  `<form (ngSubmit)="OnSubmit()">
                <div class="form-group">
                  <label>{{codigo}}</label>
                  <input type="text" [readOnly]="!isNew" [ngClass]="formControlCodigo()"  
                  [(ngModel)]="productoModel.codigo" (ngModelChange)="validaCodigo($event)"
                  [value]="productoModel.codigo" name="codigo">
                  <div class="invalid-feedback">
                    {{mensajeCodigo}}
                  </div>
                </div>
                <div class="form-group">
                  <label>{{nombre}}</label>
                  <input type="text" [ngClass]="formControlNombre()"  
                  [(ngModel)]="productoModel.nombre" (ngModelChange)="validaNombre($event)"
                  [value]="productoModel.nombre" name="nombre">
                  <div class="invalid-feedback">
                    {{mensajeNombre}}
                  </div>
                </div>
                <div class="form-group">
                  <label>{{descripcion}}</label> 
                  <textarea [ngClass]="formControlDescripcion()" name="descripcion"
                  [(ngModel)]="productoModel.descripcion" (ngModelChange)="validaDescripcion($event)"
                  rows="3">{{productoModel.descripcion}}</textarea>
                  <div class="invalid-feedback">
                    {{mensajeDescripcion}}
                  </div>
                </div>
                <div class="form-group">
                  <label>{{categoria}}</label>
                  <select name="select" [(ngModel)]="productoModel.tipo" class="form-control"> 
                    <option [value]="c.codigo" *ngFor="let c of jsonCategorias">{{c.tipo}}</option>
                  </select>
                </div> 
                <div class="form-group">
                  <label>{{stock}}</label>
                  <input type="number" [ngClass]="formControlStock()" name="stock"
                  [(ngModel)]="productoModel.stock" (ngModelChange)="validaStock($event)"
                  [value]="productoModel.stock">
                  <div class="invalid-feedback">
                    {{mensajeStock}}
                  </div>
                </div>
                <div class="form-group">
                  <label>{{stockCritico}}</label>
                  <input type="number" [ngClass]="formControlStockCritico()" name="stockCritico"
                  [(ngModel)]="productoModel.stockCritico" (ngModelChange)="validaStockCritico($event)"
                  [value]="productoModel.stockCritico">
                  <div class="invalid-feedback">
                    {{mensajeStock}}
                  </div>
                </div>
                <div class="form-group">
                  <label>{{precioCompra}}</label>
                  <input type="number" [ngClass]="formControlPrecioCompra()" name="precioCompra"
                  [(ngModel)]="productoModel.precioCompra" (ngModelChange)="validaPrecioCompra($event); calculaValor();"
                  [value]="productoModel.precioCompra">
                  <div class="invalid-feedback">
                    {{mensajePrecio}}
                  </div>
                </div>
                <div class="form-group">
                  <div >
                    <mat-checkbox class="example-margin" [(ngModel)]="chkAuto" name="chkAuto">
                      <label class="form-check-label">Valoración automática (%)</label>
                    </mat-checkbox> 
                  </div>
                  <div class="col-2">
                    <input [readOnly]="!chkAuto" type="number" class="form-control" name="multiplierPrice"
                      [(ngModel)]="multiplierPrice"  (ngModelChange)="calculaValor(); validaPrecioVenta($event);" [value]="multiplierPrice">
                  </div>
                </div>
                <div class="form-group">
                  <label>{{precioVenta}}</label>
                  <input [readOnly]="chkAuto" type="number" [ngClass]="formControlPrecioVenta()" name="precioVenta"
                  [(ngModel)]="productoModel.precioVenta" (ngModelChange)="validaPrecioVenta($event)"
                  [value]="productoModel.precioVenta">
                  <div class="invalid-feedback">
                    {{mensajePrecio}}
                  </div>
                </div>
                <section *ngIf="!isNew">
                  <mat-checkbox class="example-margin" [(ngModel)]="chkBaja" name="chkBaja">
                    <label class="form-check-label">{{active}}</label>
                  </mat-checkbox> 
                </section>

                <button type="submit" class="btn btn-dark">{{aceptar}}</button> 
              </form>`,
  styles: []
})
export class CreateComponent implements OnInit {
  
  @Input() isNew : boolean;
  @Input() iProducto : Producto;
  public productoModel : Producto = new Producto('',1,'',0,0,0,0,false,'');;

  public codigo : string; 
  public nombre : string;
  public descripcion : string; 
  public categoria : string;
  public stock : string; 
  public stockCritico : string; 
  public precioCompra : string; 
  public precioVenta : string; 
  public chkBaja : boolean;
  public chkAuto : boolean;
  public multiplierPrice : number;

  public aceptar : string; 
  public active : string;
  public jsonCategorias : any;   

  public errorCodigo : boolean;
  public errorNombre : boolean;
  public errorDescripcion : boolean;
  public errorStock : boolean;
  public errorStockCritico : boolean;
  public errorPrecioCompra : boolean;
  public errorPrecioVenta : boolean; 

  public mensajeCodigo : string;
  public mensajeNombre : string;
  public mensajeDescripcion : string;
  public mensajeStock : string;
  public mensajePrecio : string;
  
  constructor( private businessService : BusinessService,
               private productoService : ProductosService,
               private categoriaService : CategoriasService,
               private snackBar: MatSnackBar) { }

  public ngOnInit(): void {  
    this.codigo       = this.productoService.codigo;
    this.nombre       = this.productoService.nombre;
    this.descripcion  = this.productoService.descripcion;
    this.categoria    = this.productoService.categoria;
    this.categoriaService.getCategorias().subscribe(( jsonCategorias : any ) => this.jsonCategorias = jsonCategorias); 
    this.stock        = this.productoService.stock;
    this.stockCritico = this.productoService.stockCritico;
    this.precioCompra = this.productoService.precioCompra;
    this.precioVenta  = this.productoService.precioVenta;
    this.aceptar      = this.businessService.aceptar; 
    this.active       = this.productoService.active;
    this.errorCodigo  = this.errorNombre  = this.errorDescripcion = 
    this.errorStock   = this.errorStockCritico = this.errorPrecioCompra = 
    this.errorPrecioVenta = this.businessService.error;
    this.mensajeCodigo = this.productoService.mensajeCodigo;
    this.mensajeDescripcion = this.productoService.mensajeDescripcion;
    this.mensajeNombre = this.businessService.mensajeNombre;
    this.mensajePrecio = this.productoService.mensajePrecio;
    this.mensajeStock = this.productoService.mensajeStock;
  }

  public ngDoCheck(): void{ 
    if (this.iProducto !== undefined) {
      this.productoModel = this.iProducto[0]; 
      this.errorCodigo  = this.errorNombre  = this.errorDescripcion = 
      this.errorStock = this.errorStockCritico = this.errorPrecioCompra = 
      this.errorPrecioVenta = !this.businessService.error;
    }
  }

  public OnSubmit() { 
    if (!this.errorCodigo && !this.errorNombre && !this.errorDescripcion &&
        !this.errorStock && !this.errorStockCritico && 
        !this.errorPrecioCompra && !this.errorPrecioVenta) {
      if (this.isNew) {
        this.productoService.creaProducto(this.productoModel).subscribe(() => {
          this.snackBar.open(this.productoService.mensajeCreado, undefined, {
            duration: 1500,
          }); 
        }) 
      } else {
        if (this.chkBaja) {
          this.productoService.bajarProducto(this.productoModel);
        } else {
          this.productoService.actualizaProducto(this.productoModel).subscribe(() => {
            this.snackBar.open(this.productoService.mensajeActualizado, undefined, {
              duration: 1500,
            });
          }) 
        }
      }
    } else {
      this.snackBar.open(this.businessService.mensajeError, undefined, {
        duration: 1500,
      });
    }
  }

  public calculaValor(){
    try {
      if (this.chkAuto) {
        var percent = this.multiplierPrice / 100;
        var pCompra = this.productoModel.precioCompra;
        this.productoModel.precioVenta = pCompra + ( pCompra * percent );
      }
    } catch (error) { 
    }
  }

  public formControlCodigo(){
    return this.businessService.getFormControl(this.errorCodigo); 
  }

  public formControlNombre(){
    return this.businessService.getFormControl(this.errorNombre); 
  }

  public formControlDescripcion(){
    return this.businessService.getFormControl(this.errorDescripcion); 
  }

  public formControlStock(){
    return this.businessService.getFormControl(this.errorStock); 
  }

  public formControlStockCritico(){
    return this.businessService.getFormControl(this.errorStockCritico); 
  }

  public formControlPrecioCompra(){
    return this.businessService.getFormControl(this.errorPrecioCompra); 
  }

  public formControlPrecioVenta(){
    return this.businessService.getFormControl(this.errorPrecioVenta); 
  }

  public validaCodigo(campo : any){
    this.errorCodigo = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  public validaNombre(campo : any){
    this.errorNombre = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  public validaDescripcion(campo : any){
    this.errorDescripcion = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  public validaStock(campo : any){
    this.errorStock = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  public validaStockCritico(campo : any){
    this.errorStockCritico = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  public validaPrecioCompra(campo : any){
    this.errorPrecioCompra = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  public validaPrecioVenta(campo : any){
    this.errorPrecioVenta = this.businessService.validaCampo(campo, this.errorCodigo);
  }

}
