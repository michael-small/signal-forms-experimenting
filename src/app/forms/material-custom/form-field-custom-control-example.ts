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
import { ReactiveFormsModule } from '@angular/forms';
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
    <app-example-tel-input [formField]="form" />
    <p>Entered value: {{ form().value() | json }} {{ form().valid() }}</p>

    <app-example-tel-input [formField]="areaCtrl.fieldTree" />
    <p>Entered value: {{ altForm.value | json }} {{ altForm.valid }}</p>
  `,
  imports: [FormField, forwardRef(() => MyTelInput), JsonPipe, ReactiveFormsModule],
})
export class FormFieldCustomControlExample {
  readonly formModel = signal<TelValue>({
    area: '',
    name: '',
  });

  readonly form = form(this.formModel, (schemaPath) => {
    apply(schemaPath, nameSchema);
  });

  readonly areaCtrl = new SignalFormControl<TelValue>({ area: '', name: '' }, (value) => {
    apply(value, nameSchema);
  });

  readonly altForm = this.areaCtrl;
}

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'app-example-tel-input',
  template: `
    <mat-form-field>
      <mat-label>Area code</mat-label>
      <input matInput [formField]="parts.area" />
      <mat-hint>Include area code</mat-hint>
      @if (parts.area().getError('required')) {
        <mat-error>required</mat-error>
      }
    </mat-form-field>
    <mat-form-field>
      <mat-label>Name</mat-label>
      <input matInput [formField]="parts.name" />
      @if (parts.name().getError('required')) {
        <mat-error>required</mat-error>
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
