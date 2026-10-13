import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  template: `
    <h1>Signal Forms Playground</h1>

    <p>
      <a href="https://angular.dev/guide/forms/signals/overview" target="_blank">Signal Forms</a>
      documentation
    </p>
    <p>
      This project is where I messed around with various signal forms concepts for the last few
      months. Though some of this includes some exploration with third party libraries that I use,
      most examples are vanilla Angular code.
    </p>

    <nav aria-label="Form examples">
      <ul>
        <li>
          <a routerLink="/custom-control" routerLinkActive="active" ariaCurrentWhenActive="page">
            Custom form control
          </a>
        </li>
        <li>
          <a
            routerLink="/form-primitives"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
          >
            Form primitive examples
          </a>
        </li>
        <li>
          <a routerLink="/form-arrays" routerLinkActive="active" ariaCurrentWhenActive="page">
            Form arrays
          </a>
        </li>
        <li>
          <a
            routerLink="/showing-errors"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
          >
            Showing errors conditions
          </a>
        </li>
        <li>
          <a routerLink="/complex-topics" routerLinkActive="active" ariaCurrentWhenActive="page">
            Complex topics
          </a>
        </li>
        <li>
          <a
            routerLink="/large-form"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
          >
            Large form splitting strategies
          </a>
        </li>
        <li>
          <a
            routerLink="/material-modernize"
            routerLinkActive="active"
            ariaCurrentWhenActive="page"
          >
            Material modernize examples
          </a>
        </li>
      </ul>
    </nav>

    <router-outlet />
  `,
})
export class App {}
