import { Component } from '@angular/core';
import { Radio } from './radio';
import { Text } from './text';
import { Number } from './number';
import { Checkbox } from './checkbox';

@Component({
  selector: 'app-form-primitive-examples',
  imports: [Radio, Text, Checkbox, Number],
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
    </div>
  `,
})
export class FormPrimitiveExamples {}
