import { JsonPipe } from '@angular/common';
import { Component, effect, forwardRef, model, signal, untracked } from '@angular/core';
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

export const nameSchema = schema<string>((name) => {
  required(name);
  minLength(name, 3);
  maxLength(name, 3);
});

/** @title Form field with custom telephone number input control. */
@Component({
  selector: 'app-form-field-custom-control-example',
  template: `
    <app-example-tel-input [formField]="form.area" />
    <p>Entered value: {{ form().value() | json }} {{ form().valid() }}</p>

    <form [formGroup]="altForm">
      <app-example-tel-input [formField]="areaCtrl.fieldTree" />
    </form>
    <p>Entered value: {{ altForm.value | json }} {{ altForm.valid }}</p>
  `,
  imports: [FormField, forwardRef(() => MyTelInput), JsonPipe, ReactiveFormsModule],
})
export class FormFieldCustomControlExample {
  readonly formModel = signal<{ area: string }>({
    area: '',
  });

  readonly form = form(this.formModel, (schemaPath) => {
    apply(schemaPath.area, nameSchema);
  });

  readonly areaCtrl = new SignalFormControl('', (area) => {
    apply(area, nameSchema);
  });

  readonly altForm = new FormGroup({
    area: this.areaCtrl,
  });
}

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'app-example-tel-input',
  template: `
    <mat-form-field>
      <mat-label>Phone number</mat-label>
      <input matInput [formField]="parts.area" />
      <mat-hint>Include area code</mat-hint>
      @if (parts.area().getError('required')) {
        <mat-error>required</mat-error>
      }
    </mat-form-field>
  `,
  styleUrl: 'example-tel-input-example.css',
  imports: [FormField, MatInput, MatError, MatFormField, ReactiveFormsModule, MatLabel, MatHint],
})
export class MyTelInput implements FormValueControl<string> {
  readonly partsModel = signal({
    area: '',
  });

  readonly parts = form(this.partsModel, (schemaPath) => {
    apply(schemaPath.area, nameSchema);
  });

  readonly value = model('');

  constructor() {
    effect(() => {
      const { area } = this.partsModel();
      this.value.set(area);
    });

    effect(() => {
      const area = this.value();
      untracked(() => {
        const current = this.partsModel();
        if (current.area !== area) {
          this.partsModel.set({ area });
        }
      });
    });
  }
}
