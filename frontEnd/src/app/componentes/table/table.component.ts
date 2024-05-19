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
  productosFiltrados: Productos[] = [];
  cantidadMostrar = 5;
  terminoBusqueda = '';

  constructor(private productServices: ProductosService) { }

  ngOnInit(): void {
    this.obtenerProducts();
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
        this.productosFiltrados = res;
        console.log('productos recuperados', this.productosArray)
      }, error => {
        console.error('Error al obtener los datos', error);
      });
  }

  actualizarCantidadMostrar(event: any) {
    this.cantidadMostrar = event.target.value;;
  }

  actualizarBusqueda(event: any){
    this.terminoBusqueda = event.target.value.toLowerCase();
    this.filtrarProductos();
  }
  filtrarProductos() {
    this.productosFiltrados = this.productosArray.filter(producto =>
      producto.name?.toLowerCase().includes(this.terminoBusqueda) ||
      producto.description?.toLowerCase().includes(this.terminoBusqueda) ||
      producto.description?.toLowerCase().includes(this.terminoBusqueda)
    );
  }
}
