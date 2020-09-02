import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BusinessService } from '../../business.service';
import { Ilista } from '../../Interfaces/ilista'; 

@Component({
  selector: 'app-find',
  template:  `<form>
                <div class="form-row align-items-center">
                  <div class="col"> 
                    <p>Ingrese una categoría:</p>
                    <select name="select" [(ngModel)]="actual" class="custom-select" (ngModelChange)="actualizarLista($event)"> 
                      <option [value]="c.codigo" *ngFor="let c of jsonCategorias">{{c.tipo}}</option>
                    </select>
                  </div> 
                </div>
              </form>`,
  styles: []
})
export class FindComponent implements OnInit {
  
  @Output() filtro = new EventEmitter<string>();
  actual : string;
  categorias : Ilista[];
  jsonCategorias : JSON;

  constructor(private businessService : BusinessService) { }

  ngOnInit(): void {
    this.businessService.getCategoriass().subscribe(( jsonCategorias : JSON ) => this.jsonCategorias = jsonCategorias); 
    this.actualizarLista(this.actual); 
  }

  actualizarLista(selected){   
    this.filtro.emit(selected);
  }

}
