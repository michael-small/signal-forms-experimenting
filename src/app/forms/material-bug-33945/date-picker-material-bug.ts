import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'date-picker-material-bug',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/datepicker/examples#date-range-picker-forms"
        target="_blank"
        >Date Range Picker Forms Example</a
      >
    </h3>
    <mat-form-field>
      <mat-label>Enter a date range</mat-label>
      <mat-date-range-input [rangePicker]="picker">
        <input matStartDate [formField]="range.start" placeholder="Start date" />
        <input matEndDate [formField]="range.end" placeholder="End date" />
      </mat-date-range-input>
      <mat-hint>MM/DD/YYYY – MM/DD/YYYY</mat-hint>
      <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-date-range-picker #picker></mat-date-range-picker>

      @if (range.start().getError('matStartDateInvalid')) {
        <mat-error>Invalid start date</mat-error>
      }
      @if (range.end().getError('matEndDateInvalid')) {
        <mat-error>Invalid end date</mat-error>
      }
    </mat-form-field>
    <div>
      @if (range.start().getError('required'); as error) {
        <div style="border: 1px solid red; display: flex; gap: 4px">
          {{ error.message ?? error.kind }}
        </div>
      }
    </div>
    @for (error of range.start().errors(); track $index) {
      <div style="border: 1px solid green; display: flex; gap: 4px">
        {{ error.message ?? error.kind }}
      </div>
    }

    <p>Selected range: {{ range().value() | json }}</p>
  `,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, JsonPipe, FormField],
})
export class DatePickerMaterialBug {
  range = form(
    signal<{ start: Date | null; end: Date | null }>({
      start: null,
      end: null,
    }),
    (p) => {
      required(p.start, { message: 'A start date is required' });
    },
  );
}
