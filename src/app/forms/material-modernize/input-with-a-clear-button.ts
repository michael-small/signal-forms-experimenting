import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, FormField } from '@angular/forms/signals';

/**
 * @title Input with a clear button
 */
@Component({
  selector: 'input-clearable-example',
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
      @if (value()) {
        <button matSuffix matIconButton aria-label="Clear" (click)="value.set('')">
          <mat-icon>close</mat-icon>
        </button>
      }
    </mat-form-field>
  `,
  styles: `
    .example-form-field {
      width: 200px;
    }
  `,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormField],
})
export class InputClearableExample {
  protected value = signal('');
  protected form = form(this.value);
}
