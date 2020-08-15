import { Component, OnInit } from '@angular/core'; 
import { BusinessService } from '../../business.service';
import { Ilista } from '../../Interfaces/ilista';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`.navbar-blank{
              background : #FFFFFF !important;
            }
            .menu-buttons{
              margin-left : 440px;
            }
            .input-group.md-form.form-sm.form-2 input {
              border: 1px solid #bdbdbd;
              border-top-left-radius: 0.25rem;
              border-bottom-left-radius: 0.25rem;
            }`]
})
export class HeaderComponent implements OnInit {
  
  public inicio : string;
  public action : string; 
  public acciones : Ilista[]; 
  
  constructor(private businessService: BusinessService) { }

  public ngOnInit(): void {
    this.acciones = this.businessService.getMantenedores();
    this.inicio   = this.businessService.getInicio();
    this.action   = this.businessService.getAction();
  }
  
  public redirect(path : string) : void {
      this.businessService.redirect(path);
  }
  
}