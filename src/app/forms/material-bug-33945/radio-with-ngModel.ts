import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { MatRadioModule } from '@angular/material/radio';

/**
 * @title Radios with ngModel
 */
@Component({
  selector: 'radio-ng-model-example',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/radio/examples#radio-ng-model"
        target="_blank"
        >Radios with ngModel</a
      >
    </h3>
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
export class RadioNgModelExample {
  favoriteSeason = form(signal(''));

  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
}
