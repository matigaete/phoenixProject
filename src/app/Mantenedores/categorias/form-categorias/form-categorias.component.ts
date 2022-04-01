import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasService } from 'src/app/Servicios/categorias.service';
import { BusinessService } from 'src/app/Servicios/business.service';
import { Categoria } from 'src/app/Interfaces/categoria'; 
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'src/app/Include/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-form-categorias',
  template: ` <form (ngSubmit)="OnSubmit()">
                <div class="form-group">
                  <label>{{nombre}}</label>
                  <input type="text" [ngClass]="formControlNombre()"  
                  [(ngModel)]="categoriaModel.tipo" (ngModelChange)="validaNombre($event)"
                  [value]="categoriaModel.tipo" name="nombre">
                  <div class="invalid-feedback">
                    {{mensajeNombre}}
                  </div>
                </div> 
                <div class="row justify-content-around">
                  <div class="col-1">
                  <button type="submit" class="btn btn-dark">{{aceptar}}</button>
                  </div>
                  <div class="col-11">
                  <button type="button" class="btn btn-dark" (click)="nuevaCategoria()">{{nuevo}}</button>
                  </div>
                </div> 
              </form>`,
  styles: []
})
export class FormCategoriasComponent implements OnInit {
  @Output() actualiza = new EventEmitter<Categoria>();
  @Input() iCategoria: Categoria;
  public categoriaModel: Categoria = { codigo: 0, tipo: '' };
  public aceptar: string;
  public nombre: string;
  public nuevo: string;
  public mensajeNombre: string;
  public errorNombre: boolean;
  public categoria: string = 'categorias';

  constructor(private businessService: BusinessService,
    private categoriasService: CategoriasService, 
    private dialogo: MatDialog) { }

  public ngOnInit(): void {
    this.nombre = this.categoriasService.nombre;
    this.nuevo = this.categoriasService.nuevo;
    this.aceptar = this.businessService.aceptar;
    this.mensajeNombre = this.businessService.mensajeNombre;
    this.errorNombre = this.businessService.error;
  }

  public ngOnChanges() {
    if (this.iCategoria != undefined) {
      this.categoriaModel.codigo = this.iCategoria.codigo;
      const nombre = this.iCategoria.tipo;
      this.categoriaModel.tipo = nombre;
      this.errorNombre = false;
    }
  }

  public OnSubmit() {
    if (!this.errorNombre) {
      if (this.categoriaModel.codigo == 0) {
        this.dialogo.open(DialogoConfirmacionComponent, {
          data: this.categoriasService.getMensajeCrear(this.categoriaModel.tipo)
        })
          .afterClosed().
          subscribe((confirmado: Boolean) => {
            if (!confirmado) return;
            this.categoriasService.creaCategoria(this.categoriaModel).subscribe(() => {
              this.businessService.getAlert(this.categoriasService.mensajeCreado);
            })
          })
      } else {
        this.dialogo.open(DialogoConfirmacionComponent, {
          data: this.categoriasService.getMensajeActualizar(this.iCategoria.tipo, this.categoriaModel.tipo)
        })
          .afterClosed().
          subscribe((confirmado: Boolean) => {
            if (!confirmado) return;
            this.categoriasService.actualizaCategoria(this.categoriaModel).subscribe(() => {
              this.businessService.getAlert(this.categoriasService.mensajeActualizado);
            })
            this.actualiza.emit(this.categoriaModel);
          })
      }
    } else {
      this.businessService.getAlert(this.businessService.mensajeError); 
    }
  }

  public nuevaCategoria() {
    this.categoriaModel = {
      codigo: 0,
      tipo: ''
    };
    this.errorNombre = true;
  }

  public formControlNombre() {
    return this.businessService.getFormControl(this.errorNombre);
  }

  public validaNombre(campo: any) {
    this.errorNombre = this.businessService.validaCampo(campo, this.errorNombre);
  }
}
