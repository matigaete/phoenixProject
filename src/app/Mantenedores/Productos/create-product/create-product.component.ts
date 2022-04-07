import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/Interfaces/producto';

import { BusinessService } from '../../../Servicios/business.service';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { CategoriasService } from 'src/app/Servicios/categorias.service';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/Interfaces/categoria'; 

import { ProductHelper } from 'src/app/Helpers/product-helper';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styles: []
})
export class CreateProductComponent implements OnInit {

  @Input() isNew: boolean;
  @Input() iProducto: Producto;

  productoModel: Producto = { id: '' };

  chkBaja: boolean;
  chkAuto: boolean;

  categorias$: Observable<Categoria[]>;

  errorCodigo: boolean;
  errorNombre: boolean;
  errorDescripcion: boolean;
  errorStockCritico: boolean;
  errorPrecioVenta: boolean;

  constructor(private businessService: BusinessService,
    private productoService: ProductosService,
    private categoriaService: CategoriasService) { }

  ngOnInit(): void {
    this.categorias$ = this.categoriaService.getCategorias();
    this.errorCodigo = this.errorNombre = this.errorDescripcion =
      this.errorStockCritico = this.errorPrecioVenta = this.businessService.error;
  }

  ngDoCheck(): void {
    if (this.iProducto !== undefined) {
      this.productoModel = this.iProducto[0];
      this.errorCodigo = this.errorNombre = this.errorDescripcion =
        this.errorStockCritico = this.errorPrecioVenta = !this.businessService.error;
    }
  }

  OnSubmit() {
    if (!this.errorCodigo && !this.errorNombre && !this.errorDescripcion &&
      !this.errorStockCritico && !this.errorPrecioVenta) {
      if (this.isNew) {
        this.productoService.creaProducto(this.productoModel).subscribe(() => {
          this.businessService.getAlert('Producto añadido');
          this.productoModel = {};
          this.chkAuto = false;
          this.errorCodigo = this.errorNombre = this.errorDescripcion =
            this.errorStockCritico = this.errorPrecioVenta = true;
        });
      } else {
        this.productoService.actualizaProducto(this.productoModel).subscribe(() => {
          this.businessService.getAlert('Producto actualizado');
        });
      }
    } else {
      this.businessService.getAlert('Complete los campos faltantes');
    }
  }

  calculaValor() {
    if (this.chkAuto) {
      this.productoModel.precioVenta = ProductHelper.getValorAutomatico(this.productoModel);
    }
  }

  formControlCodigo() {
    return this.businessService.getFormControl(this.errorCodigo);
  }

  formControlNombre() {
    return this.businessService.getFormControl(this.errorNombre);
  }

  formControlDescripcion() {
    return this.businessService.getFormControl(this.errorDescripcion);
  }

  formControlStockCritico() {
    return this.businessService.getFormControl(this.errorStockCritico);
  }

  formControlPrecioVenta() {
    return this.businessService.getFormControl(this.errorPrecioVenta);
  }

  validaCodigo(campo: string) {
    this.productoService.getProducto(campo).subscribe((existe) => {
      this.errorCodigo = existe ? existe as boolean : false;
    });
    this.errorCodigo = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  validaNombre(campo: string) {
    this.errorNombre = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  validaDescripcion(campo: string) {
    this.errorDescripcion = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  validaStockCritico(campo: string) {
    this.errorStockCritico = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  validaPrecioVenta(campo: string) {
    this.errorPrecioVenta = this.businessService.validaCampo(campo, this.errorCodigo);
  }

}

