import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/business.service';
import { Ilista } from '../../Interfaces/ilista';
import { Producto } from 'src/app/Clases/producto';
import { plainToClass, plainToClassFromExist } from 'class-transformer';

@Component({
  selector: 'app-listado',
  template:  `<table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Categoría</th> 
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let p of jsonProductos">
                    <th scope="row">{{p.codigo}}</th>
                    <td>{{p.nombre}}</td>
                    <td>{{p.categoria}}</td> 
                  </tr>
                </tbody>
              </table>`,
  styles: []
})
export class ListadoComponent implements OnInit {

  public jsonProductos : JSON;
  productos : Producto[];
  producto : Producto;

  constructor(private businessService : BusinessService) { }

  ngOnInit(): void { 
    this.businessService.getProductoss().subscribe(( JsonProductos : JSON ) => this.jsonProductos = JsonProductos);
  }

}
