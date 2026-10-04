import { JsonPipe } from '@angular/common';
import { Component, forwardRef, input, model, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  apply,
  email,
  FormField,
  FormValueControl,
  form,
  max,
  min,
  required,
  ValidationError,
} from '@angular/forms/signals';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SignalFormControl } from '@angular/forms/signals/compat';
import { schema } from '@angular/forms/signals';

type EmailAgeValue = {
  email: string;
  age: number;
};

const defaultValue: EmailAgeValue = { email: '', age: 0 };

export const emailAgeSchema = schema<EmailAgeValue>((value) => {
  required(value.email);
  email(value.email);
  required(value.age);
  min(value.age, 18);
  max(value.age, 125);
});

/** @title Form field with custom email and age input control. */
@Component({
  selector: 'app-form-field-custom-control-example',
  template: `
    <app-example-email-age-input [formField]="signalForm.profile" />
    <p>Entered value: {{ signalForm().value() | json }} {{ signalForm().valid() }}</p>

    <form [formGroup]="reactiveForm">
      <app-example-email-age-input [formField]="reactiveForm.controls.profile.fieldTree" />
    </form>
    <p>Entered value: {{ reactiveForm.value | json }} {{ reactiveForm.valid }}</p>
  `,
  imports: [FormField, forwardRef(() => EmailAgeInput), JsonPipe, ReactiveFormsModule],
})
export class FormFieldCustomControlExample {
  readonly formModel = signal<{ profile: EmailAgeValue }>({
    profile: defaultValue,
  });

  readonly signalForm = form(this.formModel, (schemaPath) => {
    apply(schemaPath.profile, emailAgeSchema);
  });

  readonly reactiveForm = new FormGroup({
    profile: new SignalFormControl<EmailAgeValue>(defaultValue, (value) => {
      apply(value, emailAgeSchema);
    }),
  });
}

/** Custom form value control for email and age. */
@Component({
  selector: 'app-example-email-age-input',
  template: `
    <mat-form-field>
      <mat-label>Email</mat-label>
      <input matInput type="email" [formField]="emailAgeForm.email" />
      @if (emailAgeForm.email().getError('required')) {
        <mat-error>Email is required</mat-error>
      }
      @if (emailAgeForm.email().getError('email')) {
        <mat-error>Enter a valid email address</mat-error>
      }
      @for (error of errors(); track error.kind) {
        <mat-error>{{ error.message }}</mat-error>
      }
    </mat-form-field>
    <mat-form-field>
      <mat-label>Age</mat-label>
      <input matInput type="number" [formField]="emailAgeForm.age" />
      @if (emailAgeForm.age().getError('required')) {
        <mat-error>Age is required</mat-error>
      }
      @if (emailAgeForm.age().getError('min'); as minError) {
        <mat-error>Age must be at least {{ minError.min }}</mat-error>
      }
      @if (emailAgeForm.age().getError('max'); as maxError) {
        <mat-error>Age must be no more than {{ maxError.max }}</mat-error>
      }
    </mat-form-field>
  `,
  styleUrl: 'example-tel-input-example.css',
  imports: [FormField, MatInput, MatError, MatFormField, ReactiveFormsModule, MatLabel],
})
export class EmailAgeInput implements FormValueControl<EmailAgeValue> {
  readonly value = model<EmailAgeValue>(defaultValue);

  readonly emailAgeForm = form(this.value, (schemaPath) => {
    apply(schemaPath, emailAgeSchema);
  });

  readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);
}
