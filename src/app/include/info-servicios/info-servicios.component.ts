import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-servicios',
  template: `<div class="card">
                <div class="card-header">
                  <h5 class="card-title">Información:</h5>
                </div>
                <div class="card-body">
                  <p class="card-text">- Creación de servicio: Si desea crear un nuevo servicio presiona el botón "Nuevo servicio" a la derecha</p>  
                  <p class="card-text">- Modificación de servicio: Si desea modificar un servicio existente, seleccione un servicio de la lista de arriba.</p>  
                </div>
              </div>`,
  styles: []
})
export class InfoServiciosComponent implements OnInit {

  constructor() { }

  public ngOnInit(): void { }

}
