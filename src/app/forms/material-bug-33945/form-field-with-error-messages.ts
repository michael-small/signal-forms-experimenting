import { Component, computed, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/** @title Form field with error messages */
@Component({
  selector: 'form-field-error-example',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/form-field/examples#form-field-error"
        target="_blank"
        >Form field with error messages</a
      >
    </h3>
    <div class="example-container">
      <mat-form-field>
        <mat-label>Enter your email</mat-label>
        <input matInput placeholder="pat@example.com" [formField]="email" />
        @if (errorMessage(); as errorMessage) {
          <mat-error>{{ errorMessage }}</mat-error>
        }
      </mat-form-field>
    </div>
  `,
  styles: `
    .example-container mat-form-field + mat-form-field {
      margin-left: 8px;
    }
  `,
  imports: [MatFormFieldModule, MatInputModule, FormField],
})
export class FormFieldErrorExample {
  email = form(signal(''), (p) => {
    required(p, { message: 'You must enter a value' });
    email(p, { message: 'Not a valid email' });
  });

  errorMessage = computed<string>(() => {
    if (this.email().getError('required')) {
      return this.email().errors()[0].message ?? '';
    } else if (this.email().getError('email')) {
      return this.email().errors()[0].message ?? '';
    } else {
      return '';
    }
  });
}
