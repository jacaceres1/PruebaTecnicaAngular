import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export function idExistsValidator(productosService: ProductosService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (!control.value) {
      return of(null);
    }
    return productosService.verificarID(control.value).pipe(
      map(exists => (exists ? { idExists: true } : null)),
      catchError(() => of(null))
    );
  };
}
