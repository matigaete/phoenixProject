import { Component, OnInit, Input } from '@angular/core';
import { CategoriasService } from 'src/app/Servicios/categorias.service'; 
import { BusinessService } from 'src/app/Servicios/business.service'; 
import { Categoria } from 'src/app/Clases/categoria';

@Component({
  selector: 'app-form-categorias',
  template: `<form (ngSubmit)="OnSubmit()">
              <div class="form-group">
                <label>{{nombre}}</label>
                <input type="text" [ngClass]="formControlNombre()"  
                [(ngModel)]="categoriaModel.tipo" (ngModelChange)="validaNombre($event)"
                [value]="categoriaModel.tipo" name="nombre">
                <div class="invalid-feedback">
                  {{mensajeNombre}}
                </div>
              </div>
              <button type="submit" class="btn btn-dark">{{aceptar}}</button> 
            </form>`,
  styles: []
})
export class FormCategoriasComponent implements OnInit {

  @Input() iCategoria : Categoria;
  public categoriaModel : Categoria = new Categoria('',0); 
  public aceptar : string;
  public nombre : string;
  public mensajeNombre : string;
  public errorNombre : boolean;

  constructor( private businessService   : BusinessService,
               private categoriasService : CategoriasService) { }

  ngOnInit(): void {
    this.aceptar = this.businessService.aceptar; 
    this.mensajeNombre = this.businessService.mensajeNombre;
    this.errorNombre = this.businessService.error;
  }

  ngOnChanges() {
    if (this.iCategoria != undefined) {
      this.categoriaModel = this.iCategoria; 
      console.log(this.iCategoria.tipo);
      console.log(this.iCategoria);   
    }
  }

  OnSubmit(){

  }

  public formControlNombre(){
    return this.businessService.getFormControl(this.errorNombre); 
  }

  public validaNombre(campo : any){
    this.errorNombre = this.businessService.validaCampo(campo, this.errorNombre);
  }
}
