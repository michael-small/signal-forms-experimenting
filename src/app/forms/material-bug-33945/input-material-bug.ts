import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'input-material-bug',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/input/examples#input-clearable"
        target="_blank"
        >Input with a clear button</a
      >
    </h3>
    <mat-form-field class="example-form-field">
      <mat-label>Clearable input</mat-label>
      <input matInput type="text" [formField]="form" />
      <div>
        @if (value()) {
          <button matSuffix matIconButton aria-label="Clear" (click)="value.set('')">
            <mat-icon>close</mat-icon>
          </button>
        }
      </div>
    </mat-form-field>
    <div>
      @if (form().getError('required'); as error) {
        <div style="border: 1px solid red; display: flex; gap: 4px">
          {{ error.message ?? error.kind }}
        </div>
      }
    </div>
    @for (error of form().errors(); track $index) {
      <div style="border: 1px solid green; display: flex; gap: 4px">
        {{ error.message ?? error.kind }}
      </div>
    }
  `,
  styles: `
    .example-form-field {
      width: 200px;
    }
  `,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormField],
})
export class InputMaterialBug {
  protected value = signal('');
  protected form = form(this.value, (p) => {
    required(p, { message: 'A value is required' });
  });
}
