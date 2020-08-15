import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../business.service';
import { Ilista } from '../../../Interfaces/ilista';

@Component({
  selector: 'app-create',
<<<<<<< Updated upstream
  template: `<form>
                  <div class="form-group">
                    <label for="exampleFormControlInput1">{{getNombre()}}</label>
                    <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="">
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlSelect1">{{getCategoria()}}</label>
                    <select class="form-control" id="exampleFormControlSelect1"> 
                      <option *ngFor="let c of categorias">{{c.nombre}}</option>
                    </select>
                  </div>
                  <button type="button" class="btn btn-light">{{getAceptar()}}</button>
                </form>`,
=======
  template:  `<form>
                <div class="form-group">
                  <label for="exampleFormControlInput1">{{codigo}}</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="">
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">{{nombre}}</label>
                  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="">
                </div>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">{{descripcion}}</label>
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">{{categoria}}</label>
                  <select class="form-control" id="exampleFormControlSelect1"> 
                    <option *ngFor="let c of categorias">{{c.nombre}}</option>
                  </select>
                </div> 
                <div class="form-group">
                  <label for="exampleFormControlInput1">{{stock}}</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="">
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">{{stockCritico}}</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="">
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">{{precioCompra}}</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="">
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">{{precioVenta}}</label>
                  <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="">
                </div>
                <button type="button" class="btn btn-light">{{aceptar}}</button>
              </form>`,
>>>>>>> Stashed changes
  styles: []
})
export class CreateComponent implements OnInit {
  
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
  
<<<<<<< Updated upstream
  constructor( private businessService: BusinessService ) { 
    this.nombre    = businessService.getNombre();
    this.categoria = businessService.getCategoria();
    this.aceptar   = businessService.getAceptar(); 
  }
=======
  constructor( private businessService : BusinessService ) { }
>>>>>>> Stashed changes

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
    this.active       = this.businessService.getActive();
  }

}
