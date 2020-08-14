import { Component, OnInit } from '@angular/core';   
import { BusinessService } from '../../../business.service';
import { Ilista } from '../../../Interfaces/ilista';
@Component({
  selector: 'app-index-productos',
  template:  `<nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center">
                  <li *ngFor="let a of acciones" class="page-item">
                    <a class="page-link" (click)="setOption(a.id)">{{a.nombre}}</a>
                  </li> 
                </ul>
              </nav>
              <div class="container"> 
                <app-create *ngIf="option == 1"></app-create>
                <app-modify *ngIf="option == 2"></app-modify>
                <app-find   *ngIf="option == 3"></app-find> 
              </div>`,
  styles: []
})
export class IndexProductosComponent implements OnInit {
  
  public acciones : Ilista[];
  public option : number;
  
  constructor( private businessService : BusinessService ) { }
    
  ngOnInit(): void {
      this.acciones = this.businessService.getAcciones();
  }
  
  setOption(option : number) : void{
      this.option = option;
  }

  getOption() : number {
      return this.option;
  }
}
