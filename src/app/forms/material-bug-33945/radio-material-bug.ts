import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'radio-material-bug',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/radio/examples#radio-ng-model"
        target="_blank"
        >Radios with ngModel</a
      >
    </h3>
    <em>⚠️NO MAT-FORM-FIELD⚠️</em>
    <label id="example-radio-group-label">Pick your favorite season</label>
    <mat-radio-group
      aria-labelledby="example-radio-group-label"
      class="example-radio-group"
      [formField]="favoriteSeason"
    >
      @for (season of seasons; track season) {
        <mat-radio-button class="example-radio-button" [value]="season">{{
          season
        }}</mat-radio-button>
      }
    </mat-radio-group>
    <div>Your favorite season is: {{ favoriteSeason().value() }}</div>
    <div>
      @if (favoriteSeason().getError('required'); as error) {
        <div style="border: 1px solid red; display: flex; gap: 4px">
          {{ error.message ?? error.kind }}
        </div>
      }
    </div>
    @for (error of favoriteSeason().errors(); track $index) {
      <div style="border: 1px solid green; display: flex; gap: 4px">
        {{ error.message ?? error.kind }}
      </div>
    }
  `,
  styles: `
    .example-radio-group {
      display: flex;
      flex-direction: column;
      margin: 15px 0;
      align-items: flex-start;
    }

    .example-radio-button {
      margin: 5px;
    }
  `,
  imports: [MatRadioModule, FormField],
})
export class RadioMaterialBug {
  favoriteSeason = form(signal(''), (p) => {
    required(p, { message: 'custom message' });
  });

  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn', ''];
}
