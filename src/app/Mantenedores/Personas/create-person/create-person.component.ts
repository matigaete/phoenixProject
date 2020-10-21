import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Comuna } from 'src/app/Clases/comuna';
import { Persona } from 'src/app/Clases/persona';
import { Provincia } from 'src/app/Clases/provincia';
import { Region } from 'src/app/Clases/region';
import { PersonaService } from 'src/app/Servicios/persona.service';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styles: [`.mat-form-field~.mat-form-field {
                margin-right: 16px;
            }

            .lef{    
                margin-left: 16px; 
            }

            .mat-radio-button~.mat-radio-button {
                margin-left: 8px;
            }

            .card-extend{
              width:100%
            }`]
})
export class CreatePersonComponent implements OnInit {

  public validaRut = new FormControl('', [Validators.required]);
  public validaEmail = new FormControl('', [Validators.required, Validators.email]);
  public validaNombre = new FormControl('', [Validators.required]);
  public validaDireccion = new FormControl('', [Validators.required]);
  public validaFono = new FormControl('', [Validators.maxLength(9)]);
  public personaModel: Persona = new Persona('', '', '', '', '', '', '', '', '');
  public regiones$: Observable<Region[]>;
  public provincias$: Observable<Provincia[]>;
  public comunas$: Observable<Comuna[]>;
  
  constructor(private personaService: PersonaService) { }

  ngOnInit(): void {
    this.regiones$ = this.personaService.getRegiones();
  }

  onSubmit(): void {
    console.log(this.personaModel);
  }

  nuevaPersona(): void {
    this.personaModel = new Persona('', '', '', '', '', '', '', '', '');
  }

  actualizaProvincia(id: number): void {
    this.provincias$ = this.personaService.getProvincias(id);
  }

  actualizaComuna(id: number): void {
    this.comunas$ = this.personaService.getComunas(id);
  }

  getErrorEmail() {
    if (this.validaEmail.hasError('required')) {
      return 'Debe ingresar un correo';
    }
    return this.validaEmail.hasError('email') ? 'Correo no válido' : '';
  }

  getErrorRut() {
    if (this.validaRut.hasError('required')) {
      return 'Ingrese rut';
    }
  }

  getErrorNombre() {
    if (this.validaNombre.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
  }

  getErrorDireccion() {
    if (this.validaDireccion.hasError('required')) {
      return 'Debe ingresar una dirección';
    }
  }

  getErrorFono() {
    if (this.validaFono.hasError('required')) {
      return 'Debe ingresar formato de 9 números';
    }
  }

}
