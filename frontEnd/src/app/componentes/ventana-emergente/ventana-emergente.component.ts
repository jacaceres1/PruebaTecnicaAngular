import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ventana-emergente',
  templateUrl: './ventana-emergente.component.html',
  styleUrls: ['./ventana-emergente.component.css']
})
export class VentanaEmergenteComponent implements OnInit {
  @Output() confirmar = new EventEmitter<boolean>();
  @Input() nombreProducto: String = '';
  constructor() { }

  ngOnInit(): void {
  }

  confirmarEliminar() {
    this.confirmar.emit(true);
  }

  cancelarEliminar() {
    this.confirmar.emit(false);
  }
}
