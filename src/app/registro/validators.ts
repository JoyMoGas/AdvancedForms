import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

const EMAILS_REGISTRADOS = ['admin@banco.com', 'usuario@banco.com', 'test@test.com'];

export function confirmarPasswordValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmar = group.get('confirmarPassword')?.value;

  if (!password || !confirmar) return null;

  if (password !== confirmar) {
    group.get('confirmarPassword')?.setErrors({ noCoincide: true });
    return { noCoincide: true };
  } else {
    const errores = group.get('confirmarPassword')?.errors;
    if (errores) {
      const { noCoincide, ...resto } = errores;
      group.get('confirmarPassword')?.setErrors(Object.keys(resto).length ? resto : null);
    }
    return null;
  }
}

export function edadMinimaValidator(edadMinima: number = 18): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = Number(control.value);
    if (isNaN(valor) || valor < edadMinima) {
      return { edadMinima: { requerida: edadMinima, actual: valor } };
    }
    return null;
  };
}

export function emailYaRegistradoValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value?.toLowerCase();
    return of(EMAILS_REGISTRADOS.includes(email)).pipe(
      delay(800),
      map((yaExiste) => (yaExiste ? { emailRegistrado: true } : null))
    );
  };
}
