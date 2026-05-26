import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-showing-errors-conditions',
  imports: [FormField, MatFormFieldModule, MatInputModule, FormRoot],
  template: `
    <form [formRoot]="form">
      <p>Vanilla: <code>form.field().touched() && form.field().errors()</code></p>
      <label>
        First Name:
        <input [formField]="form.first" />
        @if (form.first().touched() && form.first().errors()) {
          <span class="error">Required</span>
        }
      </label>

      <p>Material: just <code>form.field().errors()</code></p>
      <mat-form-field>
        <mat-label>Last Name:</mat-label>
        <input matInput [formField]="form.last" />
        @if (form.last().errors()) {
          <mat-error>Required</mat-error>
        }
      </mat-form-field>
    </form>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 50%;
    }
    .error {
      color: red;
    }
  `,
})
export class ShowingErrorsConditions {
  protected form = form(signal({ first: '', last: '' }), (p) => {
    required(p.first);
    required(p.last);
  });
}
