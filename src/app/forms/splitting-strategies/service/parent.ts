import { Component, inject, signal } from '@angular/core';
import { SubAService } from './sub-a';
import { SubBService } from './sub-b';
import { JsonPipe } from '@angular/common';
import { FormService } from './form-service';

@Component({
  selector: 'app-parent-service',
  imports: [SubAService, SubBService, JsonPipe],
  template: `
    <app-sub-a-service />
    <app-sub-b-service />

    <pre>Parent values: {{ formService.namesForm().value() | json }}</pre>
  `,
})
export class ParentService {
  readonly formService = inject(FormService);
}
