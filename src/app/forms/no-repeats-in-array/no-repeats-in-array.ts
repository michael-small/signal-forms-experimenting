import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { applyEach, form, FormField, required, validate } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-no-repeats-in-array',
  template: `
    <div>
      @for (item of itemsForm.tags; track $index) {
        <mat-form-field>
          <mat-label>Item Name:</mat-label>
          <mat-select [formField]="item.name">
            @for (option of options; track option) {
              <mat-option [value]="option">{{ option }}</mat-option>
            }
          </mat-select>
          @for (error of item.name().errors(); track error) {
            <mat-error>{{ error.message }}</mat-error>
          }
        </mat-form-field>
      }
    </div>
    <pre>{{ itemsForm().errorSummary() | json }}</pre>
  `,
  imports: [FormField, JsonPipe, MatFormFieldModule, MatSelectModule],
  styles: `
    mat-form-field {
      display: flex;
      flex-direction: column;
      max-width: 50%;
    }
  `,
})
export class NoRepeatsInArray {
  protected options = ['Angular', 'Signals', 'Forms', 'Validation'];

  private itemsModel = signal({
    tags: [
      { id: '1', name: 'Angular' },
      { id: '2', name: 'Signals' },
      { id: '3', name: 'Angular' },
    ],
  });

  protected itemsForm = form(this.itemsModel, (schemaPath) => {
    // Iterate through array of forms
    applyEach(schemaPath.tags, (tagObjPath) => {
      required(tagObjPath.name, { message: 'Tag name is required' });

      validate(tagObjPath.name, ({ value, valueOf }) => {
        const currentName = value();

        const allTagObjects = valueOf(schemaPath.tags) || [];

        const currentId = valueOf(tagObjPath.id);
        const duplicateIndices = allTagObjects.flatMap((tag, index) =>
          tag.name === currentName && tag.id !== currentId ? [index + 1] : [],
        );

        if (duplicateIndices.length > 0 && currentName) {
          return {
            kind: 'duplicateName',
            message: `Tag name already exists at item ${duplicateIndices.join(', ')}`,
          };
        }

        return null;
      });
    });
  });
}
