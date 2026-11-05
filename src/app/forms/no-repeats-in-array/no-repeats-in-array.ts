import { JsonPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { applyEach, form, FormField, required, validate } from '@angular/forms/signals';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-no-repeats-in-array',
  template: `
    <p>
      While disabling already chosen dropdown options prevents new values being duplicated, this
      does not cover legacy data which did not used to have this restriction. While this problem
      could have been solved in various ways, the clients I worked with just wanted form validation
      to give warnings about duplicates for legacy data where there is duplicated values.
    </p>
    <div>
      @for (item of itemsForm.tags; track $index) {
        <mat-form-field>
          <mat-label>Item Name:</mat-label>
          <mat-select [formField]="item.name">
            @for (option of options; track option) {
              <mat-option
                [disabled]="option !== item.name().value() && unavailableOptions().has(option)"
                [value]="option"
                >{{ option }}</mat-option
              >
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

  protected unavailableOptions = computed<Set<string>>(
    () => new Set(this.itemsModel().tags.map((tag) => tag.name)),
  );

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
