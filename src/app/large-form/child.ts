import { Component, input } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

@Component({
  selector: 'app-child',
  template: ``,
})
export class Child {
  nameForm = input.required<FieldTree<string>>();
}
