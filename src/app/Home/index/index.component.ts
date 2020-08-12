import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  template: `<app-header></app-header>
			 <div class="container">
   			 <router-outlet></router-outlet>
			 </div>
			 <app-footer></app-footer>`,
  styles:[``]
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
