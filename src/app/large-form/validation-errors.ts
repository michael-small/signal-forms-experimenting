import { Component, input } from '@angular/core';
import { FieldState } from '@angular/forms/signals';

@Component({
  selector: 'app-validation-errors',
  template: `
    @if (fieldState().touched() && fieldState().errors(); as errors) {
      @for (error of errors; track error) {
        <span class="error">{{ error.message }}</span>
      }
    }
  `,
  styles: `
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
export class ValidationErrors {
  readonly fieldState = input.required<FieldState<unknown, string>>();
}
