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
          <a ariaCurrentWhenActive="page" routerLink="/form-primitives" routerLinkActive="active">
            Form primitive examples
          </a>
        </li>
        <li>
          <a ariaCurrentWhenActive="page" routerLink="/form-arrays" routerLinkActive="active">
            Form arrays
          </a>
        </li>
        <li>
          <a ariaCurrentWhenActive="page" routerLink="/showing-errors" routerLinkActive="active">
            Showing errors conditions
          </a>
        </li>
        <li>
          <a ariaCurrentWhenActive="page" routerLink="/complex-topics" routerLinkActive="active">
            Complex topics
          </a>
        </li>
        <li>
          <a ariaCurrentWhenActive="page" routerLink="/large-form" routerLinkActive="active">
            Large form splitting strategies
          </a>
        </li>
        <li>
          <a
            ariaCurrentWhenActive="page"
            routerLink="/material-modernize"
            routerLinkActive="active"
          >
            Material modernize examples
          </a>
        </li>
      </ul>
    </nav>

    <router-outlet />
  `,
  styles: `
    a {
      // color: red;
    }
    .active {
      color: black;
      text-decoration: none;
    }
    .active::after {
      content: '<---';
      margin-left: 4px; /* adds a small space between text and emoji */
    }
  `,
})
export class App {}
