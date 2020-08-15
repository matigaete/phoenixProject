import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../business.service'; 

@Component({
  selector: 'app-lista',
  template:  `<div class="form-group">
                <label for="exampleFormControlSelect2">Lista de productos:</label>
                <select multiple class="form-control" id="exampleFormControlSelect2">
                  <option>Producto</option> 
                </select>
              </div>`,
  styles: []
})
export class ListaComponent implements OnInit { 

  constructor(private businessService : BusinessService) { }

  ngOnInit(): void { 
  }

}
