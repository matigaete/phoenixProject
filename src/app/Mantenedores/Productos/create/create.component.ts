import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../business.service';
import { Ilista } from '../../../Interfaces/ilista';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  private nombre : string;
  private categoria : string; 
  private aceptar : string; 
  public categorias : Ilista[]; 
  
  constructor( private businessService: BusinessService ) { 
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
