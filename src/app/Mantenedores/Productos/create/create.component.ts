import { Component, OnInit, Input } from '@angular/core';
import { BusinessService } from '../../../business.service';
import { Ilista } from '../../../Interfaces/ilista';
import { Producto } from 'src/app/Clases/producto';

@Component({
  selector: 'app-create',
  template:  `<form>
                <div class="form-group">
                  <label>{{codigo}}</label>
                  <input type="text" [readOnly]="!isNew" class="form-control" value="{{valueCodigo}}">
                </div>
                <div class="form-group">
                  <label>{{nombre}}</label>
                  <input type="text" class="form-control" value="{{valueNombre}}">
                </div>
                <div class="form-group">
                  <label>{{descripcion}}</label>
                  <textarea class="form-control" rows="3">{{valueDescripcion}}</textarea>
                </div>
                <div class="form-group">
                  <label>{{categoria}}</label>
                  <select name="select" [ngModel]="valueCategoria" class="form-control"> 
                    <option [value]="c.nombre" *ngFor="let c of categorias">{{c.nombre}}</option>
                  </select>
                </div> 
                <div class="form-group">
                  <label>{{stock}}</label>
                  <input type="number" class="form-control" value="{{valueStock}}">
                </div>
                <div class="form-group">
                  <label>{{stockCritico}}</label>
                  <input type="number" class="form-control" value="{{valueStockCritico}}">
                </div>
                <div class="form-group">
                  <label>{{precioCompra}}</label>
                  <input type="number" class="form-control" value="{{valuePrecioCompra}}">
                </div>
                <div class="form-group">
                  <label>{{precioVenta}}</label>
                  <input type="number" class="form-control" value="{{valuePrecioVenta}}">
                </div>
                <button type="button" class="btn btn-light">{{aceptar}}</button>
              </form>`,
  styles: []
})
export class CreateComponent implements OnInit {
  
  @Input() isNew : boolean;
  @Input() iProducto : Producto;

  public codigo : string; 
  public nombre : string;
  public descripcion : string; 
  public categoria : string;
  public stock : string; 
  public stockCritico : string; 
  public precioCompra : string; 
  public precioVenta : string; 

  public valueCodigo : string; 
  public valueNombre : string;
  public valueDescripcion : string; 
  public valueCategoria : string; 
  public valueStock : string; 
  public valueStockCritico : string; 
  public valuePrecioCompra : string; 
  public valuePrecioVenta : string; 

  public aceptar : string; 
  public active : string;
  public categorias : Ilista[];   
  
  constructor( private businessService : BusinessService ) { }

  public ngOnInit(): void { 
    this.codigo       = this.businessService.getCodigo();
    this.nombre       = this.businessService.getNombre();
    this.descripcion  = this.businessService.getDescripcion();
    this.categoria    = this.businessService.getCategoria();
    this.categorias   = this.businessService.getCategorias();
    this.valueCategoria = this.categorias[0].nombre;
    this.stock        = this.businessService.getStock();
    this.stockCritico = this.businessService.getStockCritico();
    this.precioCompra = this.businessService.getPrecioCompra();
    this.precioVenta  = this.businessService.getPrecioVenta();
    this.aceptar      = this.businessService.getAceptar(); 
    this.active       = this.businessService.getActive() ;
  }

  public ngDoCheck(): void{ 
    if (this.iProducto !== undefined) {
      var product = this.iProducto[0];
      this.valueCodigo = product.getCodigo(); 
      this.valueNombre = product.getNombre();
      this.valueDescripcion = product.getDescripcion(); 
      this.valueCategoria = product.getTipo();
      this.valueStock = product.getStock();
      this.valueStockCritico = product.getStockCritico();
      this.valuePrecioCompra = product.getPrecioCompra();
      this.valuePrecioVenta = product.getPrecioVenta();
    }
  }
}
