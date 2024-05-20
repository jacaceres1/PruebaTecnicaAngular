import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productos } from 'src/app/models/productos';
import { ProductosService } from 'src/app/services/productos/productos.service';

@Component({
  selector: 'app-formulario-update',
  templateUrl: './formulario-update.component.html',
  styleUrls: ['./formulario-update.component.css']
})
export class FormularioUpdateComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<void>();
  actualizarProductoForm!: FormGroup;
  enviarSolicitud = false;
  constructor(
    private formBuilder: FormBuilder, private productoService: ProductosService, private productoModel: Productos
  ) { }

  ngOnInit(): void {
    this.actualizarProductoForm = this.formBuilder.group({
      id: ['',],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      fechaLiberacion: ['', Validators.required],
      fechaRevision: [{ value: '', disabled: true }, Validators.required]
    });

    this.actualizarProductoForm.get('fechaLiberacion')?.valueChanges.subscribe((value: Date) => {
      this.setFechaRevision(value);
    });
  }

  setFechaRevision(fechaLiberacion: Date): void {
    if (fechaLiberacion) {
      const fechaRevision = new Date(fechaLiberacion);
      fechaRevision.setFullYear(fechaRevision.getFullYear() + 1);
      this.actualizarProductoForm.get('fechaRevision')?.setValue(fechaRevision.toISOString().slice(0, 10));
    } else {
      this.actualizarProductoForm.get('fechaRevision')?.reset();
    }
  }

  closeModal() {
    this.closeDialog.emit();
  }

  get formControls() {
    return this.actualizarProductoForm.controls
  }

  onSubmit(){

  }

}
