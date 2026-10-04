import { JsonPipe } from '@angular/common';
import { Component, forwardRef, model, signal } from '@angular/core';
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
  validate,
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

export const emailAgeSchema = schema<EmailAgeValue>((path) => {
  required(path.email, { message: 'Email is required' });
  email(path.email, { message: 'Enter a valid email address' });
  required(path.age, { message: 'Age is required' });
  min(path.age, 18, { message: 'Age must be at least 18' });
  max(path.age, 125, { message: 'Age must be no more than 125' });
  validate(path, ({ valueOf }) => {
    if (valueOf(path.email) === '' && valueOf(path.age) === 0) {
      return { kind: 'validation', message: 'Either email or age must be provided' };
    }
    return null;
  });
});

/** @title Form field with custom email and age input control. */
@Component({
  selector: 'app-form-field-custom-control-example',
  template: `
    <h2>Reactive Form + Signal Form both using a custom Material form component</h2>

    <h3>Signal Form</h3>
    <app-example-email-age-input [formField]="signalForm.profile" />
    <pre>Entered value: {{ signalForm().value() | json }}</pre>
    <p>Valid: {{ signalForm().valid() }}</p>

    <h3>Reactive Form</h3>
    <form [formGroup]="reactiveForm">
      <app-example-email-age-input [formField]="reactiveForm.controls.profile.fieldTree" />
    </form>
    <pre>Entered value: {{ reactiveForm.value | json }}</pre>
    <p>Valid: {{ reactiveForm.valid }}</p>
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
      @for (item of emailAgeForm.email().errors(); track $index) {
        <mat-error>{{ item.message }}</mat-error>
      }
    </mat-form-field>
    <mat-form-field>
      <mat-label>Age</mat-label>
      <input matInput type="number" [formField]="emailAgeForm.age" />
      @for (item of emailAgeForm.age().errors(); track $index) {
        <mat-error>{{ item.message }}</mat-error>
      }
    </mat-form-field>

    @if (emailAgeForm().getError('validation'); as error) {
      <p style="color: red;">{{ error.message }}</p>
    }
  `,
  styleUrl: 'example-tel-input-example.css',
  imports: [FormField, MatInput, MatError, MatFormField, ReactiveFormsModule, MatLabel],
})
export class EmailAgeInput implements FormValueControl<EmailAgeValue> {
  readonly value = model<EmailAgeValue>(defaultValue);

  readonly emailAgeForm = form(this.value, (schemaPath) => {
    apply(schemaPath, emailAgeSchema);
  });
}
