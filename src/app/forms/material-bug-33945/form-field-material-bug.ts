import { Component, computed, signal } from '@angular/core';
import { email, form, FormField, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'form-field-material-bug',
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
        <div>
          @if (errorMessage(); as errorMessage) {
            <mat-error>{{ errorMessage }}</mat-error>
          }
        </div>
      </mat-form-field>
      <div>
        @if (email().getError('required'); as error) {
          <div style="border: 1px solid red; display: flex; gap: 4px">
            {{ error.message ?? error.kind }}
          </div>
        }
      </div>
      @for (error of email().errors(); track $index) {
        <div style="border: 1px solid green; display: flex; gap: 4px">
          {{ error.message ?? error.kind }}
        </div>
      }
    </div>
  `,
  styles: `
    .example-container mat-form-field + mat-form-field {
      margin-left: 8px;
    }
  `,
  imports: [MatFormFieldModule, MatInputModule, FormField],
})
export class FormFieldMaterialBug {
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
