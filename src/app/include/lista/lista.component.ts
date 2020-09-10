import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../Clases/producto';
import { plainToClass } from 'class-transformer';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { CategoriasService } from 'src/app/Servicios/categorias.service';
import { Categoria } from 'src/app/Clases/categoria';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista',
  template: `<div class="form-group">
                <label>Lista de {{entrada}}:</label>
                <select multiple *ngIf="entrada=='Productos'" class="form-control" [(ngModel)]="selectedP" (ngModelChange)="enviaProducto($event)">
                  <option [ngValue]="p" *ngFor="let p of (productos$ | async)">{{p.nombre}}</option> 
                </select>
                <select multiple *ngIf="entrada=='Categorias'" multiple class="form-control" [(ngModel)]="selectedC" (ngModelChange)="enviaCategoria($event)">
                  <option [ngValue]="c" *ngFor="let c of (categorias$ | async)">{{c.tipo}}</option> 
                </select>
              </div>`,
  styles: []
})
export class ListaComponent implements OnInit {

  @Output() producto = new EventEmitter<Producto>();
  @Output() categoria = new EventEmitter<Categoria>();
  @Input() filtro: string;
  @Input() entrada: string;
  @Input() actualiza: Categoria;
  public selectedP: Producto;
  public selectedC: Categoria;
  public categorias$: Observable<Categoria[]>;
  public productos$: Observable<Producto[]>;

  constructor(private productoService: ProductosService,
    private categoriaService: CategoriasService) { }

  public ngOnInit(): void {
    if (this.entrada == "Productos") {
      this.productos$ = this.productoService.getProductosFiltro(this.filtro);
    } else {
      this.categorias$ = this.categoriaService.getCategorias();
    }
  }

  public ngOnChanges(): void {
    if (this.entrada == "Productos") {
      this.productos$ = this.productoService.getProductosFiltro(this.filtro);
    } else {
      this.categorias$ = this.categoriaService.getCategorias();
    }
  }

  public enviaProducto(event: any) {
    let producto = plainToClass(Producto, event);
    this.producto.emit(producto);
  }

  public enviaCategoria(event: any) {
    let categoria = plainToClass(Categoria, event[0]);
    this.categoria.emit(categoria);
  }

}
