import { Component, OnInit } from '@angular/core';
import { Ilista } from 'src/app/Interfaces/ilista';
import { BusinessService } from 'src/app/Servicios/business.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  public inicio: string;
  public action: string;
  public acciones: Ilista[];

  constructor(private businessService: BusinessService,
    private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this.acciones = this.businessService.getMantenedores();
    this.inicio = this.businessService.inicio;
    this.action = this.businessService.action;
    this.redirect('index');
    this.snackBar.open('Generador de facturas en proceso, favor paciencia...', undefined, {
      duration: 1500,
    });
  }

  public redirect(path: string): void {
    this.businessService.redirect(path);
  }

}
