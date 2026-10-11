import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

/** @title Date range picker forms integration */
@Component({
  selector: 'date-range-picker-forms-example',
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

    <p>Selected range: {{ range().value() | json }}</p>
  `,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    FormField,
  ],
})
export class DateRangePickerFormsExample {
  range = form(
    signal<{ start: Date | null; end: Date | null }>({
      start: null,
      end: null,
    }),
  );
}
