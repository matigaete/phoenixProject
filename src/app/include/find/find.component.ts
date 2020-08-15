import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../business.service';
import { Ilista } from '../../Interfaces/ilista';

@Component({
  selector: 'app-find',
  template:  `<form>
                <div class="form-row align-items-center">
                  <div class="col"> 
                    <p>Ingrese una categoría:</p>
                    <select class="custom-select" id="inlineFormCustomSelect">
                      <option *ngFor="let c of categorias" value="{{c.id}}">{{c.nombre}}</option>
                    </select>
                  </div>
                </div>
              </form>`,
  styles: []
})
export class FindComponent implements OnInit {

  categorias : Ilista[];

  constructor(private businessService : BusinessService) { }

  ngOnInit(): void {
    this.categorias = this.businessService.getCategorias();
  }

}
