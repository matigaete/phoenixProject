import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/Servicios/business.service'; 
import { Producto } from 'src/app/Clases/producto'; 
import { ProductosService } from 'src/app/Servicios/productos.service';

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
                    <td>{{p.tipo}}</td> 
                  </tr>
                </tbody>
              </table>`,
  styles: []
})
export class ListadoComponent implements OnInit {

  public jsonProductos : JSON;
  productos : Producto[];
  producto : Producto;

  constructor(private productoService : ProductosService) { }

  ngOnInit(): void { 
    this.productoService.getListaProductos().subscribe(( JsonProductos : JSON ) => this.jsonProductos = JsonProductos);
  }

}
