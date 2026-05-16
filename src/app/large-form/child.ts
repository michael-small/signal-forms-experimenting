import { Component, input, signal } from '@angular/core';
import { FieldTree, form } from '@angular/forms/signals';

@Component({
  selector: 'app-child',
  template: ``,
})
export class Child {
  nameForm = input.required<FieldTree<string>>();
}
