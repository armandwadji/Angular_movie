import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <nav>
        <ul>
          <a routerLink="movies" routerLinkActive="active" (click)="goToHome()">
            <li>Acceuil</li>
          </a>
          <a routerLink="favories" routerLinkActive="active" (click)="goToFavories()">
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

  constructor(
    private readonly router: Router
  ){}

  goToHome() {
    this.router.navigate(["movies"]);
  }

  goToFavories() {
    this.router.navigate(["favories"]);
  }

}
