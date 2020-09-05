import { Component, OnInit, Input } from '@angular/core';
import { CategoriasService } from 'src/app/Servicios/categorias.service'; 
import { BusinessService } from 'src/app/Servicios/business.service'; 
import { Categoria } from 'src/app/Clases/categoria';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  @Input() iCategoria : Categoria;
  public categoriaModel : Categoria = new Categoria('',0); 
  public aceptar : string;
  public nombre : string;
  public nuevo : string;
  public mensajeNombre : string;
  public errorNombre : boolean;

  constructor( private businessService   : BusinessService,
               private categoriasService : CategoriasService,
               private snackBar: MatSnackBar,
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
      this.categoriaModel = this.iCategoria;  
      this.errorNombre = false;
    }
  }

  public OnSubmit(){
    if (!this.errorNombre) {
      console.log(this.categoriaModel);
      if (this.categoriaModel.codigo == 0) {
        this.dialogo.open(DialogoConfirmacionComponent, {
          data: this.categoriasService.getMensajeCrear(this.categoriaModel.tipo)
          })
          .afterClosed().
          subscribe((confirmado: Boolean) => {
          if (!confirmado) return;
          this.categoriasService.creaCategoria(this.categoriaModel).subscribe(() => { 
            this.snackBar.open(this.categoriasService.mensajeCreado, undefined, {
              duration: 1500,
            })
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
            this.snackBar.open(this.categoriasService.mensajeActualizado, undefined, {
              duration: 1500,
            })
          })
        })
      }
    } else {
      this.snackBar.open(this.businessService.mensajeError, undefined, {
        duration: 1500,
      });
    }
  }

  public nuevaCategoria() {
    this.categoriaModel = new Categoria("", 0);
    this.errorNombre = true;
  }

  public formControlNombre(){
    return this.businessService.getFormControl(this.errorNombre); 
  }

  public validaNombre(campo : any){
    this.errorNombre = this.businessService.validaCampo(campo, this.errorNombre);
  }
}
