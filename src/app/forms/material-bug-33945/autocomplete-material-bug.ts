import { Component, computed, signal } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, FormField, required } from '@angular/forms/signals';

@Component({
  selector: 'autocomplete-material-bug',
  template: `
    <h3>Autocomplete</h3>
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
      <div>
        @if (form().getError('required'); as error) {
          <div style="border: 1px solid red; display: flex; gap: 4px">
            {{ error.message ?? error.kind }}
          </div>
        }
      </div>
      @for (error of form().errors(); track $index) {
        <div style="border: 1px solid green; display: flex; gap: 4px">
          {{ error.message ?? error.kind }}
        </div>
      }
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
export class AutocompleteMaterialBug {
  protected form = form(signal(''), (p) => {
    required(p, { message: 'custom message' });
  });

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
