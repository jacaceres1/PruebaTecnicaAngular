import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<void>();

  agregarProductoForm!: FormGroup;
  enviarSolicitud=false;

  constructor(private formBuilder: FormBuilder, private productoService: ProductosService, private productoModel: Productos
  ) {
  }

  ngOnInit(): void {
    this.agregarProductoForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      logo: ['', Validators.required],
      fechaLiberacion: ['', Validators.required],
      fechaRevision: ['', Validators.required]
    });
  }

  closeModal() {
    this.closeDialog.emit();
  }

  resetForm() {
    this.agregarProductoForm.reset();
  }

  get formControls() {
    return this.agregarProductoForm.controls
  }

  onSubmit() {
   if (this.agregarProductoForm.valid && !this.enviarSolicitud) {
    try {
      this.enviarSolicitud = true;
      this.productoModel.id = this.agregarProductoForm.value.id;
      this.productoModel.name = this.agregarProductoForm.value.nombre;
      this.productoModel.description = this.agregarProductoForm.value.descripcion;
      this.productoModel.logo = this.agregarProductoForm.value.logo;
      this.productoModel.date_release = this.agregarProductoForm.value.fechaLiberacion;
      this.productoModel.date_revision = this.agregarProductoForm.value.fechaRevision;

      this.productoService.postProducto(this.productoModel).subscribe(response => {
        console.log('Datos enviados');
        window.location.reload();
      });
    } catch (error) {
      console.error('Error al enviar los datos', error)
    }
   }
  }


}
