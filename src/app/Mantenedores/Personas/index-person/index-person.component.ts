import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index-person',
  templateUrl: './index-person.component.html',
  styleUrls: ['./index-person.component.css']
})
export class IndexPersonComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins'];

  constructor() { }

  ngOnInit(): void {
  }

}
