import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-account-form-form-value-control',
  template: `
    <h2>Account Information</h2>
    <label>
      First Name:
      <input type="text" [value]="value()" (input)="value.set($event.target.value)" />
      @if (invalid()) {
        <div class="error-messages" role="alert">
          @for (error of errors(); track error) {
            <span class="error">{{ error.message }}</span>
          }
        </div>
      }
    </label>
  `,
  styles: `
    label {
      display: flex;
    }
  `,
})
export class AccountFormFormValueControl implements FormValueControl<string> {
  value = model<string>('');

  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
}
