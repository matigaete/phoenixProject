import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/business.service';
import { Ilista } from '../../Interfaces/ilista';

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
                  <tr *ngFor="let p of productos">
                    <th scope="row">{{p.id}}</th>
                    <td>{{p.nombre}}</td>
                    <td>{{p.path}}</td> 
                  </tr>
                </tbody>
              </table>`,
  styles: []
})
export class ListadoComponent implements OnInit {

  productos : Ilista[];

  constructor(private businessSerivce : BusinessService) { }

  ngOnInit(): void {
    this.productos = this.businessSerivce.getProductos();
  }

}
