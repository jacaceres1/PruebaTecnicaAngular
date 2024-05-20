import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { idExistsValidator } from "src/app/validators/validacion-id";
@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<void>();
  agregarProductoForm!: FormGroup;
  enviarSolicitud = false;

  constructor(private formBuilder: FormBuilder, private productoService: ProductosService, private productoModel: Productos
  ) {
  }

  ngOnInit(): void {
    this.agregarProductoForm = this.formBuilder.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [idExistsValidator(this.productoService)]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      fechaLiberacion: ['', Validators.required],
      fechaRevision: [{ value: '', disabled: true }, Validators.required]
    });

    this.agregarProductoForm.get('fechaLiberacion')?.valueChanges.subscribe((value: Date) => {
      this.setFechaRevision(value);
    });

  }

  setFechaRevision(fechaLiberacion: Date): void {
    if (fechaLiberacion) {
      const fechaRevision = new Date(fechaLiberacion);
      fechaRevision.setFullYear(fechaRevision.getFullYear() + 1);
      this.agregarProductoForm.get('fechaRevision')?.setValue(fechaRevision.toISOString().slice(0, 10));
    } else {
      this.agregarProductoForm.get('fechaRevision')?.reset();
    }
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
      this.setFechaRevision(this.agregarProductoForm.get('fechaLiberacion')?.value);

      this.agregarProductoForm.get('fechaRevision')?.enable();

      if (this.agregarProductoForm.get('fechaRevision')?.value) {
        try {
          this.enviarSolicitud = true;

          const producto: Productos = {
            id: this.agregarProductoForm.value.id,
            name: this.agregarProductoForm.value.nombre,
            description: this.agregarProductoForm.value.descripcion,
            logo: this.agregarProductoForm.value.logo,
            date_release: this.agregarProductoForm.value.fechaLiberacion,
            date_revision: this.agregarProductoForm.value.fechaRevision
          };

          this.productoService.postProducto(producto).subscribe(response => {
            console.log('Datos enviados');
            window.location.reload();
          });
        } catch (error) {
          console.error('Error al enviar los datos', error);
        } finally {
          this.agregarProductoForm.get('fechaRevision')?.disable();
        }
      } else {
        console.error('La fecha de revisión no puede ser nula');
      }
    }
  }


}
