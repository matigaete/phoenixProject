import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/business.service';

@Component({
  selector: 'app-info',
  template:  `<div class="card">
                <div class="card-header">
                  {{nombre}}
                </div>
                <div class="card-body">
                  <h5 class="card-title">{{categoria}}</h5>
                  <p class="card-text">{{info}}</p>
                  <a class="btn btn-primary">{{modificar}}</a>
                </div>
              </div>`,
  styles: []
})
export class InfoComponent implements OnInit {

  public nombre : string;
  public categoria : string;
  public info : string; 
  public modificar : string;

  constructor( private businessService : BusinessService ) { }

  public ngOnInit(): void {
    this.nombre = this.businessService.getNombre();
    this.modificar = this.businessService.getAcciones()[1].nombre;
    this.categoria = 'Aqui contiene la categoría del producto';
    this.info = 'Aqui contiene la información del producto';
  }

}
