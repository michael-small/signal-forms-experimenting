import { Component } from '@angular/core';
import { Radio } from './vanilla/radio';
import { Text } from './vanilla/text';
import { Number } from './vanilla/number';
import { Checkbox } from './vanilla/checkbox';
import { CheckboxMaterial } from './material/checkbox';
import { NumberMaterial } from './material/number';
import { TextMaterial } from './material/text';
import { RadioMaterial } from './material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { AutocompleteMaterial } from './material/extras/autocomplete';
import { ButtonToggleMaterial } from './material/extras/button-toggle';
import { SlideToggleMaterial } from './material/extras/slide-toggle';
import { SliderMaterial } from './material/extras/slider';

@Component({
  selector: 'app-form-primitive-examples',
  imports: [
    Radio,
    Text,
    Checkbox,
    Number,
    CheckboxMaterial,
    NumberMaterial,
    TextMaterial,
    RadioMaterial,
    MatTabsModule,
    AutocompleteMaterial,
    ButtonToggleMaterial,
    SlideToggleMaterial,
    SliderMaterial,
  ],
  template: `
    <div id="primitives">
      <div>
        <p>
          <a
            href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Basic_native_form_controls"
            target="_blank"
            >Basic Native Form Controls</a
          >
        </p>
        <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start" animationDuration="0ms">
          <mat-tab label="Radio"> <app-radio /></mat-tab>
          <mat-tab label="Text"> <app-text /></mat-tab>
          <mat-tab label="Checkbox"> <app-checkbox /></mat-tab>
          <mat-tab label="Number"> <app-number /></mat-tab>
        </mat-tab-group>
      </div>

      <div>
        <p>
          <a href="https://material.angular.dev/components/categories" target="_blank"
            >Material examples</a
          >
        </p>
        <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start" animationDuration="0ms">
          <mat-tab label="Radio"> <app-radio-material /></mat-tab>
          <mat-tab label="Text"> <app-text-material /></mat-tab>
          <mat-tab label="Checkbox"> <app-checkbox-material /></mat-tab>
          <mat-tab label="Number"> <app-number-material /></mat-tab>
        </mat-tab-group>
      </div>
    </div>

    <div>
      <p>
        <a href="https://material.angular.dev/components/categories" target="_blank"
          >Material, more stuff</a
        >
      </p>
      <mat-tab-group mat-stretch-tabs="false" mat-align-tabs="start" animationDuration="0ms">
        <mat-tab label="Autocomplete"> <app-autocomplete-material /></mat-tab>
        <mat-tab label="Button Toggle"> <app-button-toggle-material /></mat-tab>
        <mat-tab label="Slide Toggle"> <app-slide-toggle-material /></mat-tab>
        <mat-tab label="Slider"> <app-slider-material /></mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: `
    #primitives {
      display: flex;
      gap: 2rem;
      justify-content: space-around;
    }
  `,
})
export class FormPrimitiveExamples {}
