import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioUpdateComponent } from './formulario-update.component';

describe('FormularioUpdateComponent', () => {
  let component: FormularioUpdateComponent;
  let fixture: ComponentFixture<FormularioUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
