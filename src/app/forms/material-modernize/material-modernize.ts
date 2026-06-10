import { Component } from '@angular/core';
import { AutocompleteAutoActiveFirstOptionExample } from './highlight-first-autocomplete-option';
import { ButtonToggleFormsExample } from './button-toggle-with-forms';
import { CheckboxReactiveFormsExample } from './checkbox-with-reactive-forms';
import { ChipsFormControlExample } from './chips-with-form-control';

@Component({
  selector: 'app-material-modernize',
  imports: [
    AutocompleteAutoActiveFirstOptionExample,
    ButtonToggleFormsExample,
    CheckboxReactiveFormsExample,
    ChipsFormControlExample,
  ],
  template: `
    <chips-form-control-example />
    <checkbox-reactive-forms-example />
    <button-toggle-forms-example />
    <autocomplete-auto-active-first-option-example />
  `,
})
export class MaterialModernize {}
