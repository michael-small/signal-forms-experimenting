import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormField, FormRoot } from '@angular/forms/signals';
import { numberComparators, textComparators } from './entity.model';
import { FormService } from './form.service';

@Component({
  selector: 'app-conditional-reset',
  imports: [FormRoot, FormField, JsonPipe],
  templateUrl: './conditional-reset.html',
})
export class ConditionalReset {
  protected readonly formService = inject(FormService);

  protected dropdownOptions = this.formService.dropdownOptions;

  protected readonly numberComparators = numberComparators;
  protected readonly textComparators = textComparators;

  protected readonly form = this.formService.form;
}
