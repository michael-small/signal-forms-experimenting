import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { MatCheckboxModule } from '@angular/material/checkbox';

/** @title Checkboxes with reactive forms */
@Component({
  selector: 'checkbox-reactive-forms-example',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/checkbox/examples#checkbox-reactive-forms"
        target="_blank"
        >Checkboxes with reactive forms</a
      >
    </h3>
    <section class="example-section">
      <h4>Select your toppings:</h4>
      <p><mat-checkbox [formField]="toppings.pepperoni">Pepperoni</mat-checkbox></p>
      <p><mat-checkbox [formField]="toppings.extracheese">Extra Cheese</mat-checkbox></p>
      <p><mat-checkbox [formField]="toppings.mushroom">Mushroom</mat-checkbox></p>
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
export class CheckboxReactiveFormsExample {
  readonly toppings = form(
    signal({
      pepperoni: false,
      extracheese: false,
      mushroom: false,
    }),
  );
}
