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
                      <option [value]="c.nombre" *ngFor="let c of categorias">{{c.nombre}}</option>
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

  constructor(private businessService : BusinessService) { }

  ngOnInit(): void {
    this.categorias = this.businessService.getCategorias();  
    this.actual = this.categorias[0].nombre;
    this.actualizarLista(this.actual);
  }

  actualizarLista(selected){  
    this.filtro.emit(selected);
  }

}
