import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CategoriasService } from 'src/app/Servicios/categorias.service';
import { BusinessService } from 'src/app/Servicios/business.service';
import { Categoria } from 'src/app/Interfaces/categoria'; 
import { MatDialog } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from 'src/app/Include/dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-form-categorias',
  templateUrl: './form-categorias.component.html',
  styles: []
})
export class FormCategoriasComponent implements OnInit {
  @Output() actualiza = new EventEmitter<Categoria>();
  @Input() iCategoria: Categoria;
  categoriaModel: Categoria = { id: 0, nombre: '' };
  errorNombre: boolean;
  categoria = 'categorias';

  constructor(private businessService: BusinessService,
    private categoriasService: CategoriasService, 
    private dialogo: MatDialog) { }

  ngOnInit(): void {
    this.errorNombre = this.businessService.error;
  }

  ngOnChanges() {
    if (this.iCategoria != undefined) {
      this.categoriaModel = this.iCategoria[0];
      this.errorNombre = false;
    }
  }

  OnSubmit() {
    if (!this.errorNombre) {
      if (this.categoriaModel.id == 0) {
        this.dialogo.open(DialogoConfirmacionComponent, {
          data: this.categoriasService.getMensajeCrear(this.categoriaModel.nombre)
        })
          .afterClosed().
          subscribe((confirmado: boolean) => {
            if (!confirmado) return;
            this.categoriasService.creaCategoria(this.categoriaModel).subscribe(() => {
              this.businessService.getAlert('Categoría creada');
            });
          });
      } else {
        this.dialogo.open(DialogoConfirmacionComponent, {
          data: this.categoriasService.getMensajeActualizar(this.categoriaModel.nombre)
        })
          .afterClosed().
          subscribe((confirmado: boolean) => {
            if (!confirmado) return;
            this.categoriasService.actualizaCategoria(this.categoriaModel).subscribe(() => {
              this.businessService.getAlert('Categoría actualizada');
            });
          });
      }
    } else {
      this.businessService.getAlert('Complete los campos faltantes'); 
    }
  }

  nuevaCategoria() {
    this.categoriaModel = {
      id: 0,
      nombre: ''
    };
    this.errorNombre = true;
  }

  formControlNombre() {
    return this.businessService.getFormControl(this.errorNombre);
  }

  validaNombre(campo: string) {
    this.errorNombre = this.businessService.validaCampo(campo, this.errorNombre);
  }
}
