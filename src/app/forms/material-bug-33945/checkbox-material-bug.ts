import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'checkbox-material-bug',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/checkbox/examples#checkbox-reactive-forms"
        target="_blank"
        >Checkboxes with reactive forms</a
      >
    </h3>
    <em>⚠️NO MAT-FORM-FIELD⚠️</em>
    <section class="example-section">
      <h4>Select your toppings:</h4>
      <p><mat-checkbox [formField]="toppings.pepperoni">Pepperoni</mat-checkbox></p>
      <p><mat-checkbox [formField]="toppings.extracheese">Extra Cheese</mat-checkbox></p>
      <p><mat-checkbox [formField]="toppings.mushroom">Mushroom</mat-checkbox></p>
      <div>
        @if (toppings.pepperoni().getError('required'); as error) {
          <div style="border: 1px solid red; display: flex; gap: 4px">
            {{ error.message ?? error.kind }}
          </div>
        }
      </div>
      @for (error of toppings.pepperoni().errors(); track $index) {
        <div style="border: 1px solid green; display: flex; gap: 4px">
          {{ error.message ?? error.kind }}
        </div>
      }
    </section>

    <section class="example-section">
      <h4>You chose:</h4>
      {{ toppings().value() | json }}
    </section>
  `,
  styles: `
    .example-section {
      margin: 12px 0;
    }
  `,
  imports: [MatCheckboxModule, JsonPipe, FormField],
})
export class CheckboxMaterialBug {
  readonly toppings = form(
    signal({
      pepperoni: false,
      extracheese: false,
      mushroom: false,
    }),
    (p) => {
      required(p.pepperoni, { message: 'custom message' });
    },
  );
}
