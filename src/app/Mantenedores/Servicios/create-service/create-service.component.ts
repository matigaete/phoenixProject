import { Component, OnInit, Input } from '@angular/core';

import { BusinessService } from 'src/app/Servicios/business.service';
import { ServiciosService } from 'src/app/Servicios/servicios.service';
import { Servicio } from 'src/app/Interfaces/servicio';

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

  public servicioModel: Servicio = {};

  public errorCodigo: boolean;
  public errorNombre: boolean;
  public errorDescripcion: boolean;
  public errorPrecioVenta: boolean;

  constructor(private businessService: BusinessService,
    private serviciosService: ServiciosService,) { }

  public ngOnInit(): void {
    this.errorCodigo = this.errorNombre = this.errorDescripcion =
      this.errorPrecioVenta = this.businessService.error;
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
          this.businessService.getAlert('Servicio añadido');
        });
      } else {
        this.serviciosService.actualizaServicio(this.servicioModel).subscribe(() => {
          this.businessService.getAlert('Servicio actualizado');
        });
      }
      this.servicioModel = {};
    } else {
      this.businessService.getAlert('Complete los campos faltantes');
    }
  }

  public nuevoServicio(){
    this.isNew = true;
    this.servicioModel = {};
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
