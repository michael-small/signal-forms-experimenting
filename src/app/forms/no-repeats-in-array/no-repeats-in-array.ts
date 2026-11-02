import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { applyEach, form, FormField, required, validate } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-no-repeats-in-array',
  template: `
    @for (item of itemsForm.tags; track $index) {
      <mat-form-field>
        <mat-label>Item Name:</mat-label>
        <input matInput [formField]="item.name" />
        @for (error of item.name().errors(); track error) {
          <mat-error>{{ error.message }}</mat-error>
        }
      </mat-form-field>
    }
    <pre>{{ itemsForm().errorSummary() | json }}</pre>
  `,
  imports: [FormField, JsonPipe, MatFormFieldModule, MatInputModule],
})
export class NoRepeatsInArray {
  itemsModel = signal({
    tags: [
      { id: '1', name: 'Angular' },
      { id: '2', name: 'Signals' },
      { id: '3', name: 'Angular' },
    ],
  });

  itemsForm = form(this.itemsModel, (schemaPath) => {
    // Iterate through the array of forms
    applyEach(schemaPath.tags, (tagObjPath) => {
      required(tagObjPath.name, { message: 'Tag name is required' });

      validate(tagObjPath.name, ({ value, valueOf }) => {
        const currentName = value();

        const allTagObjects = valueOf(schemaPath.tags) || [];

        const occurrences = allTagObjects.filter((tag) => tag.name === currentName).length;

        if (occurrences > 1 && currentName) {
          return {
            kind: 'duplicateName',
            message: 'Tag already exists',
          };
        }

        return null;
      });
    });
  });
}
