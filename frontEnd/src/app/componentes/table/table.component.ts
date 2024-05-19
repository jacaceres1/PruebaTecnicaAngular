import { Component, OnInit, ViewChild } from '@angular/core';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { FormularioRegistroComponent } from '../formulario-registro/formulario-registro.component';

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

  ngAfterViewInit(): void {

  }
  /*Funciones para extras*/
  formModal = false;
  openModal() {
    this.formModal = true;
  }

  closeModal() {
    this.formModal = false;
  }

  /*Metodos para el crud*/
  obtenerProducts() {
    this.productServices.getProductos().subscribe(
      (res: Productos[]) => {
        this.productosArray = res;
        console.log('productos recuperados', this.productosArray)
      }, error => {
        console.error('Error al obtener los datos', error);
      });
  }

}
