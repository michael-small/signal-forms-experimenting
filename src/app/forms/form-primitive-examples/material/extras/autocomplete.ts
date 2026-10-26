import { Component, computed, signal } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, FormField } from '@angular/forms/signals';

export type User = {
  name: string;
};

/**
 * @title Display value autocomplete
 */
@Component({
  selector: 'app-autocomplete-material',
  template: `
    <form class="example-form">
      <mat-form-field class="example-full-width">
        <mat-label>Number</mat-label>
        <input
          aria-label="Number"
          matInput
          placeholder="Pick one"
          type="text"
          [formField]="form"
          [matAutocomplete]="auto"
        />
        <mat-autocomplete #auto="matAutocomplete">
          @for (option of filteredOptions(); track option) {
            <mat-option [value]="option">{{ option }}</mat-option>
          }
        </mat-autocomplete>
      </mat-form-field>
    </form>
  `,
  styles: `
    .example-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .example-full-width {
      width: 100%;
    }
  `,
  imports: [MatFormFieldModule, MatInputModule, MatAutocompleteModule, FormField],
})
export class AutocompleteMaterial {
  options: string[] = ['One', 'Two', 'Three'];

  form = form(signal(''));

  filteredOptions = computed<string[]>(() => {
    return this._filter(this.form().value());
  });

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
