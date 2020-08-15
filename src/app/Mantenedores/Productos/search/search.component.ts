import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  template:  `<div class="Container">
                <div class="row">
                    <div class="col">
                        <app-find></app-find>
                        <app-lista></app-lista>
                    </div>
                    <div class="col">
                        <app-create *ngIf="valor == 2"></app-create>
                        <app-info   *ngIf="valor == 3"></app-info>
                    </div>
                </div>
              </div>`,
  styles: []
})
export class SearchComponent implements OnInit {

  @Input() valor : number;
  constructor() { }

  ngOnInit(): void {
  }

}
