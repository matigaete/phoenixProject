import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Transaction {
  insert: boolean;
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

  displayedColumns = ['insert','item', 'name', 'sellcost', 'cost', 'cant', 'subtotal'];
  transactions: Transaction[] = [
    {insert: false, item: '', name:'', cant:0, cost: 0},];
  dataSource = new BehaviorSubject([]);
  public chkAll : boolean = false;

  ngOnInit(){
    this.dataSource.next(this.transactions);
  }

  /** Gets the total cost of all transactions. */
  getTotalCost() { 
    return this.transactions.map(t => t.cost*t.cant).reduce((acc, value) => acc + value, 0);
  }

  btnClick(){
    var registro : Transaction = {insert:false, item:'', cant:0, cost:0}; 
    this.transactions.push(registro); 
    this.dataSource.next(this.transactions);
  }

  clear(){
    var array = [];
    this.transactions.forEach(function(transaction, index) {
      if (!transaction.insert) {
        array.push(transaction);
      } 
    });
    this.transactions = array;
    this.dataSource.next(this.transactions);
    this.chkAll = false;
  }

  select(row){ 
      if (!row.insert) {
        row.insert = true;
      } else {
        row.insert = false;
      }
  }
  selectAll(){ 
    this.transactions.map(transac => transac.insert = this.chkAll);
    this.dataSource.next(this.transactions);
  }
}
