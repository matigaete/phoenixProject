import { Component, OnInit, EventEmitter, Output } from '@angular/core'; 
import { Ilista } from '../../Interfaces/ilista'; 
import { CategoriasService } from 'src/app/Servicios/categorias.service';

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
  
  @Output() filtro = new EventEmitter<number>();
  actual : number;
  categorias : Ilista[];
  jsonCategorias : Response;

  constructor(private categoriaService : CategoriasService) { }

  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(( jsonCategorias : Response ) => this.jsonCategorias = jsonCategorias); 
    this.actualizarLista(this.actual); 
  }

  actualizarLista(selected){    
    this.filtro.emit(selected);
  }

}
