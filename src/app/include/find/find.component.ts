import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Ilista } from '../../Interfaces/ilista';
import { CategoriasService } from 'src/app/Servicios/categorias.service';
import { Subscription, Observable } from 'rxjs';
import { Categoria } from 'src/app/Interfaces/comuna';

@Component({
  selector: 'app-find',
  template: `<form>
                <div class="form-row align-items-center">
                  <div class="col"> 
                    <p>Ingrese una categoría:</p>
                    <select name="select" [(ngModel)]="actual" class="custom-select" (ngModelChange)="actualizarLista($event)"> 
                      <option [value]="c.codigo" *ngFor="let c of (categorias$ | async)">{{c.tipo}}</option>
                    </select>
                  </div> 
                </div>
              </form>`,
  styles: []
})
export class FindComponent implements OnInit {

  @Output() filtro = new EventEmitter<number>();
  public actual: number;
  public categorias$: Observable<Categoria[]>;
  public subscription: Subscription;

  constructor(private categoriaService: CategoriasService) { }

  public ngOnInit(): void {
    this.categorias$ = this.categoriaService.getCategorias();
    this.actualizarLista(this.actual);
  }

  public actualizarLista(selected) {
    this.filtro.emit(selected);
  }

}
