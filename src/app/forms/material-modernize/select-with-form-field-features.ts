import { Component, signal } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, FormField, required } from '@angular/forms/signals';

interface Animal {
  name: string;
  sound: string;
}

/** @title Select with form field features */
@Component({
  selector: 'select-hint-error-example',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/select/overview#select-hint-error"
        target="_blank"
        >Select with form field features</a
      >
    </h3>
    <h4>mat select</h4>
    <mat-form-field>
      <mat-label>Favorite animal</mat-label>
      <mat-select [formField]="animalControl">
        <mat-option>--</mat-option>
        @for (animal of animals; track animal) {
          <mat-option [value]="animal">{{ animal.name }}</mat-option>
        }
      </mat-select>
      @if (animalControl().getError('required')) {
        <mat-error>Please choose an animal</mat-error>
      }
      <mat-hint>{{ animalControl().value()?.sound }}</mat-hint>
    </mat-form-field>

    <h4>native html select</h4>
    <mat-form-field>
      <mat-label>Select your car (required)</mat-label>
      <select matNativeControl [formField]="selectControl">
        <option label="--select something --"></option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
      @if (selectControl().getError('required')) {
        <mat-error>This field is required</mat-error>
      }
      <mat-hint>You can pick up your favorite car here</mat-hint>
    </mat-form-field>
  `,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    FormField,
  ],
})
export class SelectHintErrorExample {
  protected animalControl = form(signal<Animal | null>(null), (p) => {
    required(p);
  });
  protected selectControl = form(signal(''), (p) => {
    required(p);
  });

  protected animals: Animal[] = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  ];
}
