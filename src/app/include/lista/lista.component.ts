import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'; 
import { Producto } from '../../Clases/producto';
import { plainToClass } from 'class-transformer';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { CategoriasService } from 'src/app/Servicios/categorias.service';
import { Categoria } from 'src/app/Clases/categoria';

@Component({
  selector: 'app-lista',
  template:  `<div class="form-group">
                <label>Lista de {{entrada}}:</label>
                <select multiple *ngIf="entrada=='Productos'" class="form-control" [(ngModel)]="selectedP" (ngModelChange)="enviaProducto($event)">
                  <option [ngValue]="p" *ngFor="let p of jsonProductos">{{p.nombre}}</option> 
                </select>
                <select multiple *ngIf="entrada=='Categorias'" multiple class="form-control" [(ngModel)]="selectedC" (ngModelChange)="enviaCategoria($event)">
                  <option [ngValue]="c" *ngFor="let c of jsonCategorias">{{c.tipo}}</option> 
                </select>
              </div>`,
  styles: []
})
export class ListaComponent implements OnInit { 

  @Output() producto = new EventEmitter<Producto>();
  @Output() categoria = new EventEmitter<Categoria>();
  @Input() filtro : string;
  @Input() entrada : string;
  public selectedP : Producto; 
  public selectedC : Categoria; 
  public productos : Producto[];
  public jsonProductos : Response;
  public jsonCategorias : Response;

  constructor(private productoService : ProductosService,
              private categoriaService : CategoriasService) { }

  public ngOnInit(): void { 
    if (this.entrada == "Productos") {
      this.productoService.getProductosFiltro(this.filtro).subscribe(( JsonProductos : Response ) => this.jsonProductos = JsonProductos);  
    } else {
      this.categoriaService.getCategorias().subscribe(( jsonCategorias : Response ) => this.jsonCategorias = jsonCategorias); 
    }
  }

  public ngOnChanges(): void{
    if (this.entrada == "Productos") {
    this.productoService.getProductosFiltro(this.filtro).subscribe(( JsonProductos : Response ) => this.jsonProductos = JsonProductos);
    }
  }

  public enviaProducto(event : Response){  
    let producto = plainToClass(Producto, event); 
    this.producto.emit(producto);
  }

  public enviaCategoria(event : Response){  
    let categoria = plainToClass(Categoria, event[0]); 
    this.categoria.emit(categoria);
  }
  
}
