import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatSliderModule } from '@angular/material/slider';

/**
 * @title Range slider
 */
@Component({
  selector: 'app-slider-range-example',
  template: `
    <h3>
      <a
        href="https://material.angular.dev/components/slider/examples#slider-formatting"
        target="_blank"
        >Slider with custom thumb label formatting</a
      >
    </h3>
    <mat-slider discrete max="100000" min="0" showTickMarks step="1000" [displayWith]="formatLabel">
      <input matSliderThumb [formField]="form" />
    </mat-slider>
    <p>{{ form().value() }}</p>
  `,
  styles: `
    mat-slider {
      width: 300px;
    }
  `,
  imports: [MatSliderModule, FormField],
})
export class SliderRangeExample {
  form = form(signal(0));

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
}
