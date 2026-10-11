import { Component, computed, signal } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, FormField } from '@angular/forms/signals';

/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'autocomplete-auto-active-first-option-example',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/autocomplete/examples#autocomplete-auto-active-first-option"
        target="_blank"
        >Highlight the first autocomplete option</a
      >
    </h3>
    <form class="example-form">
      <mat-form-field class="example-full-width">
        <mat-label>Number</mat-label>
        <input
          type="text"
          placeholder="Pick one"
          aria-label="Number"
          matInput
          [formField]="form"
          [matAutocomplete]="auto"
        />
        <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
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
export class AutocompleteAutoActiveFirstOptionExample {
  protected form = form(signal(''));

  protected filteredOptions = computed<string[]>(() => {
    const formValue = this.form().value();
    return this._filter(formValue);
  });

  private options: string[] = ['One', 'Two', 'Three'];

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) => option.toLowerCase().includes(filterValue));
  }
}
