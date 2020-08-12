import { Component, OnInit } from '@angular/core';   
import { BusinessService } from '../../../business.service';

@Component({
  selector: 'app-index-productos',
  templateUrl: './index-productos.component.html',
  styleUrls: ['./index-productos.component.css']
})
export class IndexProductosComponent implements OnInit {
  
  constructor( public businessService : BusinessService ) { }
  
  
  ngOnInit(): void {
  }

}
