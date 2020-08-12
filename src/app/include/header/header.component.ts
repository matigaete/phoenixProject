import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { BusinessService } from '../../business.service';
import { Ilista } from '../../Interfaces/ilista';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  private inicio : string;
  private action : string; 
  public acciones : Ilista[]; 
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    ) { 
    
    this.inicio = businessService.getInicio();
    this.action = businessService.getAction(); 
    
  }

  public ngOnInit(): void {
    this.acciones = this.businessService.getAcciones();
  }
  
  public redirect( path ) {
      this.router.navigate([path]);
  }
  
  public setAction(action : string) : void{
      this.action = action;
  }
  
  public setInicio(inicio : string) : void {
      this.inicio = inicio;
  }
  
  public getAction() : string {
      return this.action;
  }
  
  public getInicio() : string {
      return this.inicio;
  }
}