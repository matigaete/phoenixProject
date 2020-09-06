import { Component, OnInit } from '@angular/core';

export interface Transaction {
  item: string;
  name?: string;
  cant?: number;
  cost: number;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  displayedColumns = ['item', 'name', 'cant', 'cost', 'subtotal'];
  transactions: Transaction[] = [
    {item: 'Beach ball', name:'test', cant:4, cost: 4},
    {item: 'Towel', cant:6, cost: 5},
    {item: 'Frisbee', cant:3, cost: 2},
    {item: 'Sunscreen', cant:5, cost: 4},
    {item: 'Cooler', cant:10, cost: 25},
    {item: 'Swim suit', cant:2, cost: 15},
  ];

  ngOnInit(){

  }

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.transactions.map(t => t.cost*t.cant).reduce((acc, value) => acc + value, 0);
  }

}
