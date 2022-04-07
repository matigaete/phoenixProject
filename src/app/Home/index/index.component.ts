import { Component, OnInit } from '@angular/core';
import { Ilista } from 'src/app/Interfaces/ilista';
import { BusinessService } from 'src/app/Servicios/business.service';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public action: string;
  public acciones: Ilista[];

  constructor(private businessService: BusinessService) { }

  public ngOnInit(): void {
    this.acciones = this.businessService.getMantenedores();
    this.action = this.businessService.action; 
    this.redirect('index');
  }

  public redirect(path: string): void {
    this.businessService.redirect(path);
  }

}
