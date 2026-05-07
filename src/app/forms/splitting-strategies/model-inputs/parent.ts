import { Component, signal } from '@angular/core';
import { SubAModelInputs } from './sub-a';
import { SubBModelInputs } from './sub-b';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-parent-model-inputs',
  imports: [SubAModelInputs, SubBModelInputs, JsonPipe],
  template: `
    <app-sub-a-model-inputs [(value)]="names().first" />
    <app-sub-b-model-inputs [(value)]="names().last" />

    <pre>Parent values: {{ names() | json }}</pre>
  `,
})
export class ParentModelInputs {
  names = signal({
    first: '',
    last: '',
  });
}
