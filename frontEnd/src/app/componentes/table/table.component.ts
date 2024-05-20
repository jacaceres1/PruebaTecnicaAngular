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
  mostrarDialogoEliminar = false;
  productoAEliminarId: String = '';
  /*paginacion*/
  paginaActual = 1;
  totalPaginas = 0;
  inicio = 0;
  fin = this.cantidadMostrar;
  nombreProductoAEliminar: String = '';
  constructor(private productServices: ProductosService) { }

  ngOnInit(): void {
    this.obtenerProducts();
  }




  /*Metodos para el crud*/
  obtenerProducts() {
    this.productServices.getProductos().subscribe(
      (res: Productos[]) => {
        this.productosArray = res;
        this.productosFiltrados = res;
        this.calcularTotalPaginas();
        console.log('productos recuperados', this.productosArray)
      }, error => {
        console.error('Error al obtener los datos', error);
      });
  }

  editarProducto(id: String) {

  }


  eliminarProducto(id: String) {
      this.productServices.deleteProducto(id).subscribe(
        () => {
          console.log('Registro eliminado correctamente');
          this.obtenerProducts();
        },
        (error) => {
          console.error('Error al eliminar el registro', error)
        }
      );
  }


  /*funciones para la ventana modal*/
  confirmarEliminarProducto(id: String, name: String) {
    this.mostrarDialogoEliminar = true;
    this.productoAEliminarId = id;
    this.nombreProductoAEliminar = name;
  }

  confirmarEliminar(confirmation: boolean) {
    if (confirmation) {
      this.eliminarProducto(this.productoAEliminarId);
    }
    this.mostrarDialogoEliminar = false;
    this.nombreProductoAEliminar = '';
  }
  /*Funciones para extras*/
  formModal = false;
  openModal() {
    this.formModal = true;
  }

  closeModal() {
    this.formModal = false;
  }

  actualizarCantidadMostrar(event: any) {
    this.cantidadMostrar = event.target.value;
    this.paginaActual = 1;
    this.calcularTotalPaginas();
    this.actualizarPaginacion();
  }

  actualizarBusqueda(event: any) {
    this.terminoBusqueda = event.target.value.toLowerCase();
    this.filtrarProductos();
    this.paginaActual = 1;
    this.calcularTotalPaginas();
    this.actualizarPaginacion();
  }
  filtrarProductos() {
    this.productosFiltrados = this.productosArray.filter(producto =>
      producto.name?.toLowerCase().includes(this.terminoBusqueda) ||
      producto.description?.toLowerCase().includes(this.terminoBusqueda) ||
      producto.description?.toLowerCase().includes(this.terminoBusqueda)
    );
  }

  calcularTotalPaginas() {
    this.totalPaginas = Math.ceil(this.productosFiltrados.length / this.cantidadMostrar);
  }

  actualizarPaginacion() {
    this.inicio = (this.paginaActual - 1) * this.cantidadMostrar;
    this.fin = this.inicio + this.cantidadMostrar;
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }
}
