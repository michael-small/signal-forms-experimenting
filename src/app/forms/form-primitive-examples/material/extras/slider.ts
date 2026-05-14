import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-slider-material',
  template: `
    <mat-slider min="0" max="100" step="1" showTickMarks discrete>
      <input matSliderThumb [formField]="sliderForm" />
    </mat-slider>

    <pre>value: {{ sliderForm().value() | json }}</pre>
  `,
  imports: [MatSliderModule, FormField, JsonPipe],
})
export class SliderMaterial {
  sliderForm = form(signal<number>(0));
}
