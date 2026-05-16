import { Component, signal } from '@angular/core';
import { form } from '@angular/forms/signals';
import { Child } from './child';

@Component({
  imports: [Child],
  template: ` <app-child [nameForm]="profileForm.profile.name" /> `,
})
export class Parent {
  private model = signal({
    profile: {
      name: '',
    },
  });

  profileForm = form(this.model, (p) => {
    //...
  });
}
