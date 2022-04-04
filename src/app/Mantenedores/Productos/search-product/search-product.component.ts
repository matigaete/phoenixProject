import { Component, OnInit, Input } from '@angular/core'; 
import { Producto } from 'src/app/Interfaces/producto';

@Component({
  selector: 'app-search-product',
  templateUrl:  './search-product.component.html',
  styles: []
})
export class SearchProductComponent implements OnInit {

  @Input() iValor : number;
  public filtro : number; 
  public producto : Producto;

  public ngOnInit() {
    console.log('search');
  }
  
  public refresh(filtro : number){
    this.filtro = filtro;
  }

  public enviaProducto(producto : Producto){
    this.producto = producto;
  }

  public enviaAccion(oValor: number){
    this.iValor = oValor; 
  }

}

