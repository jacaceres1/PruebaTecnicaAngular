import { Injectable } from '@angular/core';


import { Productos } from '../../models/productos';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  /*Configuración para conectar con el microservicio*/
  private API_PRODUCTOS = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";
  private headers = new HttpHeaders({
    'header-name': '24'
  });


  constructor(private http: HttpClient) { }

  /*Obtener todos los registros*/
  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>(this.API_PRODUCTOS, { headers: this.headers });
  }

  /*Crear un nuevo producto*/
  postProducto(nuevoProducto: Productos): Observable<Productos> {
    return this.http.post<Productos>(this.API_PRODUCTOS, nuevoProducto, { headers: this.headers });
  }

  /* Eliminar un producto por su id */
  deleteProducto(id: String): Observable<string> {
    const url = `${this.API_PRODUCTOS}?id=${id}`;
    return this.http.delete(url, { headers: this.headers, responseType: 'text' });
  }

  /* Verificar si un ID existe */
  verificarID(id: string): Observable<boolean> {
    const url = `${this.API_PRODUCTOS}/verification?id=${id}`;
    return this.http.get<boolean>(url, { headers: this.headers });
  }

  /*actualizar un dato*/
  updateProducto(id: string, producto: Productos): Observable<Productos> {
    const url = `${this.API_PRODUCTOS}?id=${id}`;
    return this.http.put<Productos>(url, producto, { headers: this.headers });
  }
}
