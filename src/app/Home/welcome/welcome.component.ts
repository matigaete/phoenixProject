import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductosService } from 'src/app/Servicios/productos.service';
import { Producto } from 'src/app/Clases/producto';

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
 
  constructor(private productosService : ProductosService, 
    private snackBar : MatSnackBar) { }

  public displayedColumns = ['insert','item', 'name', 'sellcost', 'cost', 'cant', 'subtotal'];
  public transactions: Transaction[] = [
    {insert: false, item: '', name:'', cant:0, cost: 0},];
  public dataSource = new BehaviorSubject([]);
  public chkAll : boolean = false;
  public total : number;
  public producto$ : Observable<Producto>;

  public ngOnInit(){
    this.dataSource.next(this.transactions);
  }

  public OnSubmit(){
    this.snackBar.open('Generador de facturas en proceso, favor paciencia...', undefined, {
      duration: 1500,
    });
  }
 
  public getTotalCost() { 
    this.total = this.transactions.map(t => t.cost*t.cant).reduce((acc, value) => acc + value, 0);
  }

  public btnClick(){
    var registro : Transaction = {insert:false, item:'', cant:0, cost:0}; 
    this.transactions.push(registro); 
    this.dataSource.next(this.transactions);
  }

  public clear(){
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

  public select(row){ 
      if (!row.insert) {
        row.insert = true;
      } else {
        row.insert = false;
      }
  }
  public selectAll(){ 
    this.transactions.map(transac => transac.insert = this.chkAll);
    this.dataSource.next(this.transactions);
  }

  public find(number : string){
    this.producto$ = this.productosService.getProducto(number);
    this.producto$.forEach(element => {
      console.log(element);
    });
    
  }
}
