import { JsonPipe } from '@angular/common';
import {
  Component,
  effect,
  forwardRef,
  linkedSignal,
  model,
  signal,
  untracked,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  form,
  FormField,
  maxLength,
  minLength,
  required,
  FormValueControl,
  apply,
} from '@angular/forms/signals';
import { MatFormField, MatHint, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { SignalFormControl } from '@angular/forms/signals/compat';
import { schema } from '@angular/forms/signals';

type TelValue = {
  area: string;
  name: string;
};

export const nameSchema = schema<TelValue>((value) => {
  required(value.area);
  minLength(value.area, 2);
  maxLength(value.area, 3);
  required(value.name);
  minLength(value.name, 2);
  maxLength(value.name, 3);
});

/** @title Form field with custom telephone number input control. */
@Component({
  selector: 'app-form-field-custom-control-example',
  template: `
    <app-example-tel-input [formField]="signalForm.tel" />
    <p>Entered value: {{ signalForm().value() | json }} {{ signalForm().valid() }}</p>

    <form [formGroup]="reactiveForm">
      <app-example-tel-input [formField]="reactiveForm.controls.tel.fieldTree" />
    </form>
    <p>Entered value: {{ reactiveForm.value | json }} {{ reactiveForm.valid }}</p>
  `,
  imports: [FormField, forwardRef(() => MyTelInput), JsonPipe, ReactiveFormsModule],
})
export class FormFieldCustomControlExample {
  readonly formModel = signal<{ tel: TelValue }>({
    tel: {
      area: '',
      name: '',
    },
  });

  readonly signalForm = form(this.formModel, (schemaPath) => {
    apply(schemaPath.tel, nameSchema);
  });

  readonly reactiveForm = new FormGroup({
    tel: new SignalFormControl<TelValue>({ area: '', name: '' }, (value) => {
      apply(value, nameSchema);
    }),
  });
}

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'app-example-tel-input',
  template: `
    <mat-form-field>
      <mat-label>Area code</mat-label>
      <input matInput [formField]="parts.area" />
      @if (parts.area().getError('required')) {
        <mat-error>required</mat-error>
      }
      @if (parts.area().getError('minLength'); as minLengthError) {
        <mat-error>Minimum length is {{ minLengthError.minLength }}</mat-error>
      }
    </mat-form-field>
    <mat-form-field>
      <mat-label>Name</mat-label>
      <input matInput [formField]="parts.name" />
      @if (parts.name().getError('required')) {
        <mat-error>required</mat-error>
      }
      @if (parts.name().getError('minLength'); as minLengthError) {
        <mat-error>Minimum length is {{ minLengthError.minLength }}</mat-error>
      }
    </mat-form-field>
  `,
  styleUrl: 'example-tel-input-example.css',
  imports: [FormField, MatInput, MatError, MatFormField, ReactiveFormsModule, MatLabel, MatHint],
})
export class MyTelInput implements FormValueControl<TelValue> {
  readonly partsModel = linkedSignal(
    () => {
      return {
        area: this.value().area,
        name: this.value().name,
      };
    },
    {
      set: (value) => {
        this.value.set(value);
      },
    },
  );

  readonly parts = form(this.partsModel, (schemaPath) => {
    apply(schemaPath, nameSchema);
  });

  readonly value = model<TelValue>({ area: '', name: '' });
}
