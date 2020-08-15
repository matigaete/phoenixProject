import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../business.service';
import { Ilista } from '../../../Interfaces/ilista';

@Component({
  selector: 'app-create',
  template:  `<form>
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
  styles: []
})
export class CreateComponent implements OnInit {
  private nombre : string;
  private categoria : string; 
  private aceptar : string; 
  public categorias : Ilista[]; 
  
  constructor( private businessService : BusinessService ) { 
    this.nombre    = businessService.getNombre();
    this.categoria = businessService.getCategoria();
    this.aceptar   = businessService.getAceptar(); 
  }

  public ngOnInit(): void { 
    this.categorias = this.businessService.getCategorias();
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
  
  public getNombre() : string {
      return this.nombre;
  }
  
  public getCategoria() : string {
      return this.categoria;
  }
  
  public getAceptar() : string {
      return this.aceptar;
  }
}
