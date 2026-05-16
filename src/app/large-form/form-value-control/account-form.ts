import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError, WithOptionalFieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-account-form-form-value-control',
  template: `
    <label>
      First Name:
      <input
        type="text"
        [value]="value()"
        (input)="value.set($event.target.value)"
        (blur)="touched.set(true)"
      />
      @if (invalid() && touched()) {
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
    .error {
      color: #dc2626;
      font-size: 0.75rem;
      font-weight: 500;
      margin-bottom: 0.25rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;

      &::before {
        content: '⚠';
        font-size: 0.875rem;
        transform: translateY(-0.125em);
      }
    }
  `,
})
export class AccountFormFormValueControl implements FormValueControl<string> {
  value = model<string>('');

  invalid = input<boolean>(false);
  errors = input<readonly WithOptionalFieldTree<ValidationError>[]>([]);
  touched = model<boolean>(false);
}
