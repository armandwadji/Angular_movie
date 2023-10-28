import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <nav>
        <ul>
          <a href="#">
            <li>Acceuil</li>
          </a>
          <a href="#">
            <li>Coup de coeur</li>
          </a>
        </ul>
      </nav>
      <h1>Shaki Movies</h1>
    </header>
  `,
  styles: [
  ]
})
export class HeaderComponent {

}
