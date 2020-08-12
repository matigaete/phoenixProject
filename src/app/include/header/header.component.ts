import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  titulo : string = 'PhoenixProject';
  inicio : string = 'Inicio';
  action : string = 'Mantenedores';
  acciones : IAcciones[]; 
  //name;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    ) { 
    
  }

  ngOnInit(): void {
    this.acciones = this.getAcciones();
    /*this.route.queryParams.subscribe(params => {
    this.name = params['name'];
  });*/
  }
  
  redirect( path ) {
      this.router.navigate([path]);
  }
  
  getAcciones() : IAcciones[] {
    return [{
        id : 1,
        nombre : 'Productos',  
        path : 'create',
    }, {
        id : 2,
        nombre : '',
        path : 'update',
    }, {
        id : 3,
        nombre : '',
        path : 'find',
      }
    ]
  }
}

interface IAcciones{
    id : number;
    nombre : string;
    path ?: string;
    component ?: string;
    redirectTo ?: string;
}