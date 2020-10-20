import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Persona } from 'src/app/Clases/persona';

@Component({
  selector: 'app-index-person',
  templateUrl: './index-person.component.html',
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

export class IndexPersonComponent implements OnInit {

  validaRut = new FormControl('', [Validators.required]);
  validaEmail = new FormControl('', [Validators.required, Validators.email]);
  validaNombre = new FormControl('', [Validators.required]);
  validaDireccion = new FormControl('', [Validators.required]);
  validaFono = new FormControl('', [Validators.maxLength(9)]);  
  personaModel : Persona = new Persona('','','','','','','','','');

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }

  nuevaPersona(): void {

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
