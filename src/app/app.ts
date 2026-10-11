import { Component } from '@angular/core';
import { MaterialBug33945 } from './forms/material-bug-33945/material-bug-33945';

@Component({
  selector: 'app-root',
  imports: [MaterialBug33945],
  template: ` <app-material-bug-33945 /> `,
  styles: `
    #info {
      display: flex;
      gap: 2rem;
    }
  `,
})
export class App {}
