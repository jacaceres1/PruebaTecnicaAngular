import { Component, OnInit,EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-formulario-registro',
  templateUrl: './formulario-registro.component.html',
  styleUrls: ['./formulario-registro.component.css']
})
export class FormularioRegistroComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<void>();
  constructor() {
   }

  ngOnInit(): void {
  }

  closeModal(){
    this.closeDialog.emit();
  }

}
