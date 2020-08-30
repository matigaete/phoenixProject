import { Component, OnInit, Input } from '@angular/core';
import { BusinessService } from '../../../business.service';
import { Ilista } from '../../../Interfaces/ilista';
import { Producto } from 'src/app/Clases/producto';

@Component({
  selector: 'app-create',
  template:  `<form>
                <div class="form-group">
                  <label>{{codigo}}</label>
                  <input type="text" [readOnly]="!isNew" class="form-control" placeholder="">
                </div>
                <div class="form-group">
                  <label>{{nombre}}</label>
                  <input type="text" class="form-control" placeholder="">
                </div>
                <div class="form-group">
                  <label>{{descripcion}}</label>
                  <textarea class="form-control" rows="3"></textarea>
                </div>
                <div class="form-group">
                  <label>{{categoria}}</label>
                  <select class="form-control"> 
                    <option *ngFor="let c of categorias">{{c.nombre}}</option>
                  </select>
                </div> 
                <div class="form-group">
                  <label>{{stock}}</label>
                  <input type="number" class="form-control" placeholder="">
                </div>
                <div class="form-group">
                  <label>{{stockCritico}}</label>
                  <input type="number" class="form-control" placeholder="">
                </div>
                <div class="form-group">
                  <label>{{precioCompra}}</label>
                  <input type="number" class="form-control" placeholder="">
                </div>
                <div class="form-group">
                  <label>{{precioVenta}}</label>
                  <input type="number" class="form-control" placeholder="">
                </div>
                <button type="button" class="btn btn-light">{{aceptar}}</button>
              </form>`,
  styles: []
})
export class CreateComponent implements OnInit {
  
  @Input() isNew : boolean;
  @Input() producto : Producto;

  public codigo : string; 
  public nombre : string;
  public descripcion : string; 
  public categoria : string;
  public stock : string; 
  public stockCritico : string; 
  public precioCompra : string; 
  public precioVenta : string; 
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
    this.stock        = this.businessService.getStock();
    this.stockCritico = this.businessService.getStockCritico();
    this.precioCompra = this.businessService.getPrecioCompra();
    this.precioVenta  = this.businessService.getPrecioVenta();
    this.aceptar      = this.businessService.getAceptar(); 
    this.active       = this.businessService.getActive() ;
  }

}
