import { Component } from '@angular/core';
import { Radio } from './vanilla/radio';
import { Text } from './vanilla/text';
import { Number } from './vanilla/number';
import { Checkbox } from './vanilla/checkbox';
import { CheckboxMaterial } from './material/checkbox';
import { NumberMaterial } from './material/number';
import { TextMaterial } from './material/text';
import { RadioMaterial } from './material/radio';

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
  ],
  template: `
    <div>
      <p>
        <a
          href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Basic_native_form_controls"
          target="_blank"
          >Basic Native Form Controls</a
        >
      </p>
      <app-radio />
      <app-text />
      <app-checkbox />
      <app-number />

      <p>
        <a href="https://material.angular.dev/components/categories" target="_blank"
          >Material examples</a
        >
      </p>
      <app-radio-material />
      <app-text-material />
      <app-checkbox-material />
      <app-number-material />
    </div>
  `,
})
export class FormPrimitiveExamples {}
