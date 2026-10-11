import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { form, FormField } from '@angular/forms/signals';

/** @title Timepicker forms integration */
@Component({
  selector: 'timepicker-forms-example',
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

    <p>Value: {{ form().value() }}</p>
    <p>Touched: {{ form().touched() }}</p>
    <p>Dirty: {{ form().dirty() }}</p>
  `,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, MatTimepickerModule, FormField],
})
export class TimepickerFormsExample {
  form = form(signal<Date | null>(new Date(new Date().setHours(12, 30, 0))));
}
