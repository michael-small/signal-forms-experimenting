import { Component, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { form, FormField, required } from '@angular/forms/signals';

interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'select-material-bug',
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
    </mat-form-field>
    <div>
      @if (animalControl().getError('required'); as error) {
        <div style="border: 1px solid red; display: flex; gap: 4px">
          {{ error.message ?? error.kind }}
        </div>
      }
    </div>
    @for (error of animalControl().errors(); track $index) {
      <div style="border: 1px solid green; display: flex; gap: 4px">
        {{ error.message ?? error.kind }}
      </div>
    }

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
    </mat-form-field>
    <div>
      @if (selectControl().getError('required'); as error) {
        <div style="border: 1px solid red; display: flex; gap: 4px">
          {{ error.message ?? error.kind }}
        </div>
      }
    </div>
    @for (error of selectControl().errors(); track $index) {
      <div style="border: 1px solid green; display: flex; gap: 4px">
        {{ error.message ?? error.kind }}
      </div>
    }
  `,
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormField],
})
export class SelectMaterialBug {
  protected animalControl = form(signal<Animal | null>(null), (p) => {
    required(p, { message: 'custom message' });
  });
  protected selectControl = form(signal(''), (p) => {
    required(p, { message: 'custom message' });
  });

  protected animals: Animal[] = [
    { name: 'Dog', sound: 'Woof!' },
    { name: 'Cat', sound: 'Meow!' },
    { name: 'Cow', sound: 'Moo!' },
    { name: 'Fox', sound: 'Wa-pa-pa-pa-pa-pa-pow!' },
  ];
}
