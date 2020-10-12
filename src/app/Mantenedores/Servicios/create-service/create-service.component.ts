import { Component, OnInit, Input } from '@angular/core';

import { BusinessService } from '../../../Servicios/business.service';
import { ServiciosService } from 'src/app/Servicios/servicios.service';
import { Servicio } from 'src/app/Clases/servicio';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styles: [`.btn-dark~.btn-dark {
              margin-left: 16px;
            }`]
})
export class CreateServiceComponent implements OnInit {

  @Input() isNew: boolean;
  @Input() iServicio: Servicio;

  public servicioModel: Servicio = new Servicio('', '', 0, '');

  public codigo: string;
  public nombre: string;
  public descripcion: string;
  public precioVenta: string;

  public aceptar: string;
  public active: string;

  public errorCodigo: boolean;
  public errorNombre: boolean;
  public errorDescripcion: boolean;
  public errorPrecioVenta: boolean;

  public mensajeCodigo: string;
  public mensajeNombre: string;
  public mensajeDescripcion: string;
  public mensajePrecio: string;

  constructor(private businessService: BusinessService,
    private serviciosService: ServiciosService,) { }

  public ngOnInit(): void {
    this.codigo = this.serviciosService.codigo;
    this.nombre = this.serviciosService.nombre;
    this.descripcion = this.serviciosService.descripcion;
    this.precioVenta = this.serviciosService.precioVenta;
    this.aceptar = this.businessService.aceptar;
    this.errorCodigo = this.errorNombre = this.errorDescripcion =
      this.errorPrecioVenta = this.businessService.error;
    this.mensajeCodigo = this.serviciosService.mensajeCodigo;
    this.mensajeDescripcion = this.serviciosService.mensajeDescripcion;
    this.mensajeNombre = this.businessService.mensajeNombre;
    this.mensajePrecio = this.serviciosService.mensajePrecio;
  }

  public ngDoCheck(): void {
    if (this.iServicio !== undefined) {
      this.isNew = false;
      this.servicioModel = this.iServicio[0];
      this.errorCodigo = this.errorNombre = this.errorDescripcion =
        this.errorPrecioVenta = !this.businessService.error;
    }
  }

  public OnSubmit() {
    if (!this.errorCodigo && !this.errorNombre &&
      !this.errorDescripcion && !this.errorPrecioVenta) {
      if (this.isNew) {
        this.serviciosService.creaServicio(this.servicioModel).subscribe(() => {
          this.businessService.getAlert(this.serviciosService.mensajeCreado);
        })
      } else {
        this.serviciosService.actualizaServicio(this.servicioModel).subscribe(() => {
          this.businessService.getAlert(this.serviciosService.mensajeActualizado);
        })
      }
      this.servicioModel = new Servicio('', '', 0, '');
    } else {
      this.businessService.getAlert(this.businessService.mensajeError);
    }
  }

  public nuevoServicio(){
    this.isNew = true;
    this.servicioModel = new Servicio('', '', 0, '');
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

  public validaPrecioVenta(campo: any) {
    this.errorPrecioVenta = this.businessService.validaCampo(campo, this.errorCodigo);
  }

}
