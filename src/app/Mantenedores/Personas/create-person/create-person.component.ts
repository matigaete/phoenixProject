import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Comuna } from 'src/app/Clases/comuna';
import { Persona } from 'src/app/Clases/persona';
import { Provincia } from 'src/app/Clases/provincia';
import { Region } from 'src/app/Clases/region';
import { BusinessService } from 'src/app/Servicios/business.service';
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

  @Input() iPersona: Persona;
  public validaRut = new FormControl('', [Validators.required]);
  public validaEmail = new FormControl('', [Validators.required, Validators.email]);
  public validaNombre = new FormControl('', [Validators.required]);
  public validaDireccion = new FormControl('', [Validators.required]);
  public validaFono = new FormControl('', [Validators.maxLength(9)]);
  public personaModel: Persona = new Persona('', '', '', 'P', 0, 0, 0, '');
  public regiones$: Observable<Region[]>;
  public provincias$: Observable<Provincia[]>;
  public comunas$: Observable<Comuna[]>;
  public isNew: boolean = true;

  constructor(private businessService: BusinessService,
    private personaService: PersonaService) { }

  public ngOnInit(): void {
    this.regiones$ = this.personaService.getRegiones();
  }

  public ngDoCheck(): void {
    if (this.iPersona !== undefined) {
      this.actualizaProvincia(this.iPersona[0].region);
      this.actualizaComuna(this.iPersona[0].provincia);
      this.personaModel = this.iPersona[0];
      this.iPersona = undefined;
      this.isNew = false;
    }
  }

  public onSubmit(): void {
    console.log(this.personaModel);
    if (this.isNew) {
      this.personaService.creaPersona(this.personaModel).subscribe(() => {
        this.businessService.getAlert(this.personaService.mensajeCreado);
        this.personaModel = new Persona('', '', '', 'P', 0, 0, 0, '');
        this.isNew = true;
      })
    } else { 
      this.personaService.actualizaPersona(this.personaModel).subscribe(() => {
        this.businessService.getAlert(this.personaService.mensajeActualizado);
      })
    }
  }

  public nuevaPersona(): void {
    this.personaModel = new Persona('', '', '', 'P', 0, 0, 0, '');
    this.isNew = true;
  }

  public actualizaProvincia(id: number): void {
    this.provincias$ = this.personaService.getProvincias(id);
  }

  public actualizaComuna(id: number): void {
    this.comunas$ = this.personaService.getComunas(id);
  }

  public getErrorEmail() {
    if (this.validaEmail.hasError('required')) {
      return 'Debe ingresar un correo';
    }
    return this.validaEmail.hasError('email') ? 'Correo no válido' : '';
  }

  public getErrorRut() {
    if (this.validaRut.hasError('required')) {
      return 'Ingrese rut';
    }
  }

  public getErrorNombre() {
    if (this.validaNombre.hasError('required')) {
      return 'Debe ingresar un nombre';
    }
  }

  public getErrorDireccion() {
    if (this.validaDireccion.hasError('required')) {
      return 'Debe ingresar una dirección';
    }
  }

  public getErrorFono() {
    if (this.validaFono.hasError('required')) {
      return 'Debe ingresar formato de 9 números';
    }
  }

}
