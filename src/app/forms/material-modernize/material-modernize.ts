import { Component } from '@angular/core';
import { AutocompleteAutoActiveFirstOptionExample } from './highlight-first-autocomplete-option';
import { ButtonToggleFormsExample } from './button-toggle-with-forms';

@Component({
  selector: 'app-material-modernize',
  imports: [AutocompleteAutoActiveFirstOptionExample, ButtonToggleFormsExample],
  template: `
    <button-toggle-forms-example />
    <autocomplete-auto-active-first-option-example />
  `,
})
export class MaterialModernize {}
