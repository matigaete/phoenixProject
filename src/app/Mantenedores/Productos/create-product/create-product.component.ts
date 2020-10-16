import { Component, OnInit, Input } from '@angular/core';
import { Producto } from 'src/app/Clases/producto';

import { BusinessService } from '../../../Servicios/business.service';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { CategoriasService } from 'src/app/Servicios/categorias.service';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/Clases/categoria';
import { Precio } from 'src/app/Clases/precio';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styles: []
})
export class CreateProductComponent implements OnInit {

  @Input() isNew: boolean;
  @Input() iProducto: Producto;

  public productoModel: Producto = new Producto('', 1, '', 0, 0, 0, 0, 0, false, '');;

  public codigo: string;
  public nombre: string;
  public descripcion: string;
  public categoria: string;
  public stock: string;
  public stockCritico: string;
  public precioCompra: string;
  public precioVenta: string;
  public chkBaja: boolean;
  public chkAuto: boolean; 

  public aceptar: string;
  public active: string;
  public categorias$: Observable<Categoria[]>;

  public errorCodigo: boolean;
  public errorNombre: boolean;
  public errorDescripcion: boolean; 
  public errorStockCritico: boolean; 
  public errorPrecioVenta: boolean;

  public mensajeCodigo: string;
  public mensajeNombre: string;
  public mensajeDescripcion: string;
  public mensajeStock: string;
  public mensajePrecio: string;

  constructor(private businessService: BusinessService,
    private productoService: ProductosService,
    private categoriaService: CategoriasService) { }

  public ngOnInit(): void {
    this.codigo = this.productoService.codigo;
    this.nombre = this.productoService.nombre;
    this.descripcion = this.productoService.descripcion;
    this.categoria = this.productoService.categoria;
    this.categorias$ = this.categoriaService.getCategorias();
    this.stock = this.productoService.stock;
    this.stockCritico = this.productoService.stockCritico;
    this.precioCompra = this.productoService.precioCompra;
    this.precioVenta = this.productoService.precioVenta;
    this.aceptar = this.businessService.aceptar;
    this.active = this.productoService.active;
    this.errorCodigo = this.errorNombre = this.errorDescripcion =
      this.errorStockCritico =  this.errorPrecioVenta = this.businessService.error;
    this.mensajeCodigo = this.productoService.mensajeCodigo;
    this.mensajeDescripcion = this.productoService.mensajeDescripcion;
    this.mensajeNombre = this.businessService.mensajeNombre;
    this.mensajePrecio = this.productoService.mensajePrecio;
    this.mensajeStock = this.productoService.mensajeStock;
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
          this.businessService.getAlert(this.productoService.mensajeCreado);
          this.productoModel = new Producto('', 1, '', 0, 0, 0, 0, 0, false, ''); 
          this.chkAuto = false;
        })
      } else {
        if (this.chkBaja) {
          this.productoService.bajarProducto(this.productoModel)
            .afterClosed().
            subscribe((confirmado: Boolean) => {
              if (!confirmado) return;
              this.productoService.bajaProducto(this.productoModel).subscribe(() => {
                this.businessService.getAlert(this.productoService.mensajeBajado);
              });
            });
        } else {
          this.productoService.actualizaProducto(this.productoModel).subscribe(() => {
            this.businessService.getAlert(this.productoService.mensajeActualizado);
          })
        }
      }
    } else {
      this.businessService.getAlert(this.businessService.mensajeError);
    }
  }

  public calculaValor() {
    if (this.chkAuto) {
      this.productoModel.getValorAutomatico();
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

