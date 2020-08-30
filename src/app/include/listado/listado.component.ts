import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/business.service';
import { Ilista } from '../../Interfaces/ilista';
import { Producto } from 'src/app/Clases/producto';

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
                    <th scope="row">{{p.getID()}}</th>
                    <td>{{p.getNombre()}}</td>
                    <td>{{p.getCategoria()}}</td> 
                  </tr>
                </tbody>
              </table>`,
  styles: []
})
export class ListadoComponent implements OnInit {

  productos : Producto[];

  constructor(private businessSerivce : BusinessService) { }

  ngOnInit(): void {
    this.productos = this.businessSerivce.getProductos();
  }

}
