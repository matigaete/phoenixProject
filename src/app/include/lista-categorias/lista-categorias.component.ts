import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { plainToClass } from 'class-transformer';
import { CategoriasService } from 'src/app/Servicios/categorias.service';
import { Categoria } from 'src/app/Interfaces/comuna';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-categorias',
  template: `<div class="form-group">
                <label>Lista de Categorias:</label>
                <select multiple class="form-control" [(ngModel)]="selectedC" (ngModelChange)="enviaCategoria($event)">
                  <option [ngValue]="c" *ngFor="let c of (categorias$ | async)">{{c.tipo}}</option> 
                </select>
              </div>`,
  styles: []
})
export class ListaCategoriasComponent implements OnInit {
 
  @Output() categoria = new EventEmitter<Categoria>();
  @Input() filtro: string; 
  @Input() actualiza: Categoria; 
  public selectedC: Categoria;
  public categorias$: Observable<Categoria[]>; 

  constructor(private categoriaService: CategoriasService) { }

  public ngOnInit(): void {
      this.categorias$ = this.categoriaService.getCategorias();
  }

  public ngOnChanges(): void {
      this.categorias$ = this.categoriaService.getCategorias();
  }

  public enviaCategoria(event: any) {
    let categoria = plainToClass(Categoria, event[0]);
    this.categoria.emit(categoria);
  }

}
