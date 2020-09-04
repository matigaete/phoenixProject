import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Ilista } from '../Interfaces/ilista';
import { Producto } from '../Clases/producto';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  public url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getCategorias() {
    return this.http.get(`${this.url}getCategories.php`);
  } 
}
