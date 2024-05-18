import { Injectable } from '@angular/core';


import {Productos} from '../../models/productos';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  /*Configuración para conectar con el microservicio*/
  private API_PRODUCTOS =  "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";
  private headers = new HttpHeaders({
    'header-name': '24'
  });


  constructor(private http: HttpClient) { }

  /*Obtener todos los registros*/
  getProductos(): Observable<Productos[]>{
    return this.http.get<Productos[]>(this.API_PRODUCTOS,{headers: this.headers});
  }
}
