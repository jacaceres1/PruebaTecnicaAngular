import { Component, OnInit } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  productosArray: Productos[] = [];

  constructor(private productServices: ProductosService) { }

  ngOnInit(): void {
    this.obtenerProducts();
  }

  obtenerProducts(){
    this.productServices.getProductos().subscribe(
      (res: Productos[]) => {
      this.productosArray = res;
      console.log('productos recuperados', this.productosArray)
    }, error =>{
      console.error('Error al obtener los datos', error);
    });
  }

}
