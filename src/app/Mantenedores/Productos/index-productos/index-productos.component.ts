import { Component, OnInit } from '@angular/core';   
import { BusinessService } from '../../../business.service';
import { Ilista } from '../../../Interfaces/ilista';
@Component({
  selector: 'app-index-productos',
  template:  `<nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li *ngFor="let a of acciones" class="page-item {{a.current}}" role="button">  
                    <a class="page-link" (click)="asignarOpcion(a.id)">
                      {{a.nombre}} 
                    </a>
                  </li> 
                </ul>
              </nav>
              <div class="container">  
                <app-create  *ngIf="option == 1" [isNew]="option"></app-create>
                <app-search  *ngIf="option == 2" [valor]="option"></app-search>
                <app-search  *ngIf="option == 3" [valor]="option"></app-search> 
                <app-listado *ngIf="option == 4"></app-listado> 
              </div>`,
  styles: []
})
export class IndexProductosComponent implements OnInit {
  
  public acciones : Ilista[];
  public option : number;
  public current : string;
  
  constructor( private businessService : BusinessService ) { }
    
  ngOnInit(): void {
      this.acciones = this.businessService.getAcciones();
      this.option   = this.businessService.getOption();
      this.acciones[this.option - 1].current = this.businessService.getActive();
  }
  
  public asignarOpcion(option : number) : void {
    this.acciones = this.businessService.asignarOpcion(option, this.acciones);
    this.option   = this.businessService.getOption();
  }
}
