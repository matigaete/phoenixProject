import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasService } from 'src/app/Servicios/categorias.service';
import { Categoria } from 'src/app/Interfaces/categoria';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
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

  public enviaCategoria(categoria: Categoria) {
    this.categoria.emit(categoria);
  }

}
