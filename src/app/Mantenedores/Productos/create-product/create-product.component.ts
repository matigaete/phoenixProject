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

  public productoModel: Producto = { idProducto: '' };

  public chkBaja: boolean;
  public chkAuto: boolean;

  public categorias$: Observable<Categoria[]>;

  public errorCodigo: boolean;
  public errorNombre: boolean;
  public errorDescripcion: boolean;
  public errorStockCritico: boolean;
  public errorPrecioVenta: boolean;

  constructor(private businessService: BusinessService,
    private productoService: ProductosService,
    private categoriaService: CategoriasService) { }

  public ngOnInit(): void {
    this.categorias$ = this.categoriaService.getCategorias();
    this.errorCodigo = this.errorNombre = this.errorDescripcion =
      this.errorStockCritico = this.errorPrecioVenta = this.businessService.error;
  }

  public ngDoCheck(): void {
    if (this.iProducto !== undefined) {
      this.productoModel = this.iProducto[0];
      this.errorCodigo = this.errorNombre = this.errorDescripcion =
        this.errorStockCritico = this.errorPrecioVenta = !this.businessService.error;
    }
  }

  public OnSubmit() {
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
        if (this.chkBaja) {
          this.productoService.bajarProducto(this.productoModel)
            .afterClosed().
            subscribe((confirmado: boolean) => {
              if (!confirmado) return;
              this.productoService.bajaProducto(this.productoModel).subscribe(() => {
                this.businessService.getAlert('Producto dado de baja');
              });
            });
        } else {
          this.productoService.actualizaProducto(this.productoModel).subscribe(() => {
            this.businessService.getAlert('Producto actualizado');
          });
        }
      }
    } else {
      this.businessService.getAlert('Complete los campos faltantes');
    }
  }

  public calculaValor() {
    if (this.chkAuto) {
      ProductHelper.getValorAutomatico(this.productoModel);
    }
  }

  public formControlCodigo() {
    return this.businessService.getFormControl(this.errorCodigo);
  }

  public formControlNombre() {
    return this.businessService.getFormControl(this.errorNombre);
  }

  public formControlDescripcion() {
    return this.businessService.getFormControl(this.errorDescripcion);
  }

  public formControlStockCritico() {
    return this.businessService.getFormControl(this.errorStockCritico);
  }

  public formControlPrecioVenta() {
    return this.businessService.getFormControl(this.errorPrecioVenta);
  }

  public validaCodigo(campo: any) {
    this.errorCodigo = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  public validaNombre(campo: any) {
    this.errorNombre = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  public validaDescripcion(campo: any) {
    this.errorDescripcion = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  public validaStockCritico(campo: any) {
    this.errorStockCritico = this.businessService.validaCampo(campo, this.errorCodigo);
  }

  public validaPrecioVenta(campo: any) {
    this.errorPrecioVenta = this.businessService.validaCampo(campo, this.errorCodigo);
  }

}

