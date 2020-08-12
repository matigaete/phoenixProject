import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  nombre : string = 'Nombre del producto';
  categoria : string = 'Categoría del producto';
  categorias : ICategorias[];
  constructor() { 
  }

  ngOnInit(): void {
    this.categorias = this.getCategorias();
  }
  
  getCategorias() : ICategorias[] {
      return [{
          id : 1,
          nombre : 'Maquina', 
      },
      {
          id : 2,
          nombre : 'Herramienta',
      }
      ]
  }
  

}

interface ICategorias{
    id : number;
    nombre : string;
}