import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CategoriasService } from 'src/app/Servicios/categorias.service';
import { Subscription, Observable } from 'rxjs';
import { Categoria } from 'src/app/Interfaces/categoria';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
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
