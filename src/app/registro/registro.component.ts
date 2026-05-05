import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import {
  confirmarPasswordValidator,
  edadMinimaValidator,
  emailYaRegistradoValidator,
} from './validators';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  formulario!: FormGroup;
  enviando = false;
  enviado = false;
  mostrarPassword = false;
  mostrarConfirmar = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.construirFormulario();
  }

  private construirFormulario(): void {
    this.formulario = this.fb.group(
      {
        nombre: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
            Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/),
          ],
        ],
        email: [
          '',
          {
            validators: [Validators.required, Validators.email],
            asyncValidators: [emailYaRegistradoValidator()],
            updateOn: 'blur',
          },
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
          ],
        ],
        confirmarPassword: ['', [Validators.required]],
        edad: [
          '',
          [Validators.required, Validators.min(1), Validators.max(120), edadMinimaValidator(18)],
        ],
        terminos: [false, [Validators.requiredTrue]],
      },
      { validators: confirmarPasswordValidator }
    );
  }

  campo(nombre: string): AbstractControl {
    return this.formulario.get(nombre)!;
  }

  mostrarError(nombre: string): boolean {
    const c = this.campo(nombre);
    return c.invalid && (c.dirty || c.touched);
  }

  mensajeError(nombre: string): string {
    const c = this.campo(nombre);
    if (!c.errors) return '';

    if (nombre === 'nombre') {
      if (c.errors['required']) return 'El nombre es obligatorio.';
      if (c.errors['minlength']) return 'El nombre debe tener al menos 3 caracteres.';
      if (c.errors['maxlength']) return 'El nombre no puede superar 50 caracteres.';
      if (c.errors['pattern']) return 'El nombre solo puede contener letras y espacios.';
    }

    if (nombre === 'email') {
      if (c.errors['required']) return 'El email es obligatorio.';
      if (c.errors['email']) return 'Ingresa un email válido.';
      if (c.errors['emailRegistrado']) return 'Este email ya está registrado en el sistema.';
    }

    if (nombre === 'password') {
      if (c.errors['required']) return 'La contraseña es obligatoria.';
      if (c.errors['minlength']) return 'La contraseña debe tener al menos 8 caracteres.';
      if (c.errors['pattern'])
        return 'Debe contener al menos una mayúscula, una minúscula y un número.';
    }

    if (nombre === 'confirmarPassword') {
      if (c.errors['required']) return 'Debes confirmar la contraseña.';
      if (c.errors['noCoincide']) return 'Las contraseñas no coinciden.';
    }

    if (nombre === 'edad') {
      if (c.errors['required']) return 'La edad es obligatoria.';
      if (c.errors['min'] || c.errors['max']) return 'Ingresa una edad válida.';
      if (c.errors['edadMinima'])
        return `Debes tener al menos ${c.errors['edadMinima'].requerida} años para registrarte.`;
    }

    if (nombre === 'terminos') {
      if (c.errors['required']) return 'Debes aceptar los términos y condiciones.';
    }

    return 'Campo inválido.';
  }

  get emailVerificando(): boolean {
    return this.campo('email').pending;
  }

  get formularioValido(): boolean {
    return this.formulario.valid && !this.enviando;
  }

  togglePassword(): void {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleConfirmar(): void {
    this.mostrarConfirmar = !this.mostrarConfirmar;
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.enviando = true;
    this.enviado = false;

    setTimeout(() => {
      console.log('Datos enviados:', this.formulario.value);
      this.enviando = false;
      this.enviado = true;
      this.formulario.reset();

      setTimeout(() => (this.enviado = false), 4000);
    }, 1800);
  }
}
