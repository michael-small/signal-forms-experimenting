import { Component, signal } from '@angular/core';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'timepicker-material-bug',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/timepicker/overview#timepicker-forms"
        target="_blank"
        >Timepicker Forms Integration</a
      >
    </h3>
    <mat-form-field>
      <mat-label>Pick a time</mat-label>
      <input matInput [formField]="form" [matTimepicker]="picker" />
      <mat-timepicker-toggle matIconSuffix [for]="picker" />
      <mat-timepicker #picker />
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

    <p>Value: {{ form().value() }}</p>
    <p>Touched: {{ form().touched() }}</p>
    <p>Dirty: {{ form().dirty() }}</p>
  `,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatTimepickerModule, FormField],
})
export class TimepickerMaterialBug {
  form = form(signal<Date | null>(null), (p) => {
    required(p, { message: 'custom message' });
  });
}
