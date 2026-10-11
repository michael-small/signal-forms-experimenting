import { Component, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'slider-material-bug',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/slider/examples#slider-formatting"
        target="_blank"
        >Slider with custom thumb label formatting</a
      >
    </h3>
    <mat-slider min="0" max="100000" step="1000" showTickMarks discrete [displayWith]="formatLabel">
      <input matSliderThumb [formField]="form" />
    </mat-slider>
    <p>{{ form().value() }}</p>
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
  `,
  styles: `
    mat-slider {
      width: 300px;
    }
  `,
  imports: [MatSliderModule, FormField],
})
export class SliderMaterialBug {
  form = form(signal(0), (p) => {
    required(p, { message: 'A slider value is required' });
  });

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
